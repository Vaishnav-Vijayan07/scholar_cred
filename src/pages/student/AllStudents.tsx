import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Card, Form, Button, Modal, Alert, Spinner, Dropdown } from "react-bootstrap";
import Table from "../../components/Table";
import { withSwal } from "react-sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import FileUploader from "../../components/FileUploader";

// import StudentData from "../../assets/excel/StudentData.xlsx";

// components
import PageTitle from "../../components/PageTitle";
import { StudentDataTypes, StudentInitialState, StudentValidationState, initialState, sizePerPageList } from "../users/data";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  createStudent,
  deleteStudent,
  editStudent,
  getAdminStaff,
  getConsultantStaffByAdmin,
  getStudent,
  getStudentByConsultant,
  getStudentByCreated,
  getStudentByStaff,
  resetPassword,
} from "../../redux/actions";
import { showErrorAlert, showSuccessAlert } from "../../constants/alerts";
import axios from "axios";
import { getColumns, getConsultantStaffColumns, getCredStaffColumns } from "./ColumnsConfig";
import { truncateText } from "../../constants/functons";

interface FileType extends File {
  preview?: string;
  formattedSize?: string;
}

const BasicInputElements = withSwal((props: any) => {
  const { swal, loading, state, error, user, initialLoading, credStaffData, sourceData, getStudentBasedOnRole, consultant_id, ConsultantStaff } = props;
  console.log("sourceData==>", sourceData);

  const dispatch = useDispatch();

  const [filteredItems, setFilteredItems] = useState(state);

  const [isUpdate, setIsUpdate] = useState(false);
  //Input data
  const [formData, setFormData] = useState<StudentDataTypes>(StudentInitialState);
  const [selectedStaff, setSelectedStaff] = useState("Choose Staff");
  // Modal states
  const [responsiveModal, setResponsiveModal] = useState<boolean>(false);
  const [uploadModal, setUploadModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<FileType[]>([]);
  //validation errors
  const [validationErrors, setValidationErrors] = useState(StudentValidationState);

  const validationSchema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup.string().required("Email is required").email("Invalid email format"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be a valid 10-digit number"),
    date_of_birth: yup.string().required("DOB is required"),
    country_of_origin: yup.string().nullable(),
    source: yup.string().required("Source is required").nullable(),
    // application_status: yup.string().oneOf(["Pending", "Approved", "Rejected"]).required(),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema), // Integrate yup with react-hook-form
    defaultValues: initialState,
  });

  useEffect(() => {
    setFilteredItems(state);
  }, [state]);

  //handling update logic
  const handleUpdate = (item: any) => {
    setFormData((prev) => ({
      ...prev,
      student_id: item.student_id,
      first_name: item.first_name,
      last_name: item.last_name,
      email: item.email,
      phone: item.phone,
      date_of_birth: moment(item.date_of_birth).format("YYYY-MM-DD"),
      country_of_origin: item.country_of_origin,
      application_status: item.application_status,
      source: item.source,
    }));

    setIsUpdate(true);
  };

  //handle delete function
  const handleDelete = (id: string) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          // swal.fire("Deleted!", "Your item has been deleted.", "success");
          dispatch(deleteStudent(id));
        }
      });
  };

  //handle onchange function
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    // Limit the length to 10 characters
    if (name == "phone") {
      const numericValue = value.replace(/\D/g, "");
      const truncatedValue = numericValue.slice(0, 10);
      setFormData({
        ...formData,
        [name]: truncatedValue,
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  //handle form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate the form using yup
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      // Validation passed, handle form submission
      if (isUpdate) {
        dispatch(
          editStudent(
            formData.student_id,
            formData.first_name,
            formData.last_name,
            formData.email,
            formData.phone,
            formData.date_of_birth,
            formData.country_of_origin,
            formData.application_status,
            formData.source
          )
        );
      } else {
        // Handle add logic
        dispatch(
          createStudent(
            formData.first_name,
            formData.last_name,
            formData.email,
            formData.phone,
            formData.date_of_birth,
            formData.country_of_origin,
            formData.application_status,
            formData.source,
            consultant_id
          )
        );
      }
    } catch (validationError) {
      // Handle validation errors
      if (validationError instanceof yup.ValidationError) {
        const errors: any = {};
        validationError.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        setValidationErrors(errors);
      }
    }
  };

  //handle cancel update section
  const handleCancelUpdate = () => {
    setIsUpdate(false);
    setFormData(StudentInitialState);
  };

  const toggleResponsiveModal = () => {
    setResponsiveModal(!responsiveModal);
    // setValidationErrors(InitialValidationState);
    if (isUpdate) {
      handleCancelUpdate();
    }
  };

  const setDemoData = () => {
    setFormData((prev) => ({
      ...prev,
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      phone: "9876545678",
      date_of_birth: "2023-12-05",
      country_of_origin: "India",
      application_status: "Pending",
    }));
  };

  useEffect(() => {
    // Check for errors and clear the form
    if (!loading && !error) {
      setValidationErrors(StudentValidationState);
      handleCancelUpdate();
      setResponsiveModal(false);
    }
  }, [loading, error]);

  const handleDownloadClick = () => {
    const filePath = "/excel/StudentData.xlsx";
    const link = document.createElement("a");
    link.download = "Student.xlsx";
    link.href = "http://localhost:3000" + filePath;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleUploadModal = () => {
    setUploadModal(!uploadModal);
  };

  //set selected file to state from the fileuploader component
  const handleOnFileUpload = (files: FileType[]) => {
    setSelectedFile(files);
  };

  const handleFileUpload = async () => {
    if (!selectedFile || selectedFile.length < 1 || !selectedFile[0]) {
      showErrorAlert("Please select a file.");
      return;
    }

    // Get the file extension
    const fileExtension = selectedFile[0].name.split(".").pop()?.toLowerCase();

    // Check if the file extension is '.xlsx'
    if (fileExtension !== "xlsx") {
      showErrorAlert("Please select a valid .xlsx file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile[0]);
    setIsLoading(true);

    try {
      const response = await axios.post(`bulk_upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showSuccessAlert(response.data.message);
      setIsLoading(false);
      getStudentBasedOnRole();
      setSelectedFile([]);
      toggleUploadModal();
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleResetPassword = (email: string) => {
    axios
      .post(`reset_student_password`, { email: email })
      .then((res: any) => {
        console.log("res===>", res);
        showSuccessAlert("Password reset successfull");
      })
      .catch((err) => {
        console.error(err);
        showErrorAlert("Error occured");
      });
  };

  const handleAssign = (assigned_staff_id: string, student_id: string) => {
    axios
      .post("assign_consultant_staff", {
        assigned_staff_id,
        student_id,
      })
      .then((res) => {
        showSuccessAlert("Assigned staff succesfully...");
        getStudentBasedOnRole()
      })
      .catch((err) => {
        console.log(err);
        showErrorAlert("Something went wrong!");
      });
  };

  if (initialLoading) {
    return <Spinner animation="border" style={{ position: "absolute", top: "50%", left: "50%" }} />;
  }

  console.log("ConsultantStaff", ConsultantStaff);

  const columns1 = getColumns(handleUpdate, toggleResponsiveModal, handleDelete, handleAssign, ConsultantStaff);
  const consultantStaffColumns = getConsultantStaffColumns(handleResetPassword, resetPassword, handleUpdate, toggleResponsiveModal, handleDelete);
  const credStaffColumns = getCredStaffColumns(handleUpdate, toggleResponsiveModal, handleDelete);

  const handleFilter = (staff_id: any) => {
    // Filter the initial list based on the provided category
    const filteredList = state?.filter((item: any) => item.staff_id === staff_id);

    // Update the state with the filtered list
    setFilteredItems(filteredList);
  };

  const handleClearFilter = () => {
    setFilteredItems(state);
  };

  return (
    <>
      <Row className="justify-content-between px-2">
        <Modal show={responsiveModal} onHide={toggleResponsiveModal} dialogClassName="modal-dialog-centered">
          <Form onSubmit={onSubmit}>
            <Modal.Header closeButton>
              <h4 className="modal-title">Student Management</h4>
            </Modal.Header>
            <Modal.Body className="px-3">
              {error && (
                <Alert variant="danger" className="my-2">
                  {error}
                </Alert>
              )}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="first_name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="first_name" placeholder="Enter First Name" value={formData.first_name} onChange={handleInputChange} />
                    {validationErrors.first_name && <Form.Text className="text-danger">{validationErrors.first_name}</Form.Text>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="last_name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Second Name" name="last_name" value={formData.last_name} onChange={handleInputChange} />
                    {validationErrors.last_name && <Form.Text className="text-danger">{validationErrors.last_name}</Form.Text>}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange} />
                    {validationErrors.email && <Form.Text className="text-danger">{validationErrors.email}</Form.Text>}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" maxLength={10} name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleInputChange} />
                    {validationErrors.phone && <Form.Text className="text-danger">{validationErrors.phone}</Form.Text>}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="country_of_origin">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" name="country_of_origin" placeholder="Enter country name" value={formData.country_of_origin} onChange={handleInputChange} />
                    {validationErrors.country_of_origin && <Form.Text className="text-danger">{validationErrors.country_of_origin}</Form.Text>}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="date_of_birth">
                    <Form.Label>DOB</Form.Label>
                    <Form.Control type="date" name="date_of_birth" placeholder="Enter DOB" value={formData.date_of_birth} onChange={handleInputChange} />
                    {validationErrors.date_of_birth && <Form.Text className="text-danger">{validationErrors.date_of_birth}</Form.Text>}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="source">
                    <Form.Label>Source</Form.Label>
                    <Form.Select name="source" value={formData.source} onChange={handleInputChange} aria-label="Default select example">
                      <option disabled value="" selected>
                        Choose a source...{" "}
                      </option>
                      {sourceData?.map((item: any) => (
                        <option value={item?.id} key={item?.id}>
                          {item?.source_name}
                        </option>
                      ))}
                    </Form.Select>
                    {validationErrors.source && <Form.Text className="text-danger">{validationErrors.source}</Form.Text>}
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                id="button-addon2"
                disabled={loading}
                className="mt-1 waves-effect waves-light me-2"
                onClick={() => {
                  if (isUpdate) {
                    handleCancelUpdate();
                    toggleResponsiveModal();
                  } else {
                    toggleResponsiveModal();
                  }
                }}
              >
                {!isUpdate ? "Close" : "Cancel"}
              </Button>

              <Button type="submit" variant="success" id="button-addon2" className="waves-effect waves-light mt-1 me-2" disabled={loading}>
                {isUpdate ? "Update" : "Submit"}
              </Button>

              <Button variant="success" id="button-addon2" className="waves-effect waves-light mt-1" disabled={loading} onClick={() => setDemoData()}>
                Add test data
              </Button>
            </Modal.Footer>

            {/* )} */}
          </Form>
        </Modal>

        {/* ----------- file upload modal ------ */}

        <Modal show={uploadModal} onHide={toggleUploadModal} dialogClassName="modal-dialog-centered">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <p className="text-muted mb-1 font-small">*Please upload the Excel file following the example format.</p>
            <FileUploader onFileUpload={handleOnFileUpload} showPreview={true} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
            <div className="d-flex gap-2 justify-content-end mb-2">
              <Button className="btn-sm btn-blue waves-effect waves-light" onClick={handleDownloadClick}>
                <i className="mdi mdi-download-circle"></i> Download Sample
              </Button>
              <Button className="btn-sm btn-success waves-effect waves-light" onClick={handleFileUpload} disabled={isLoading}>
                <i className="mdi mdi-upload"></i> Upload File
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        <Col className="p-0 form__card">
          <Card className="bg-white">
            <Card.Body>
              <>
                <div className="d-flex float-end gap-2">
                  {user.role == "7" && (
                    <Dropdown className="btn-group" align="end">
                      <Dropdown.Toggle variant="" className="btn-sm btn-outline-blue">
                        <i className="mdi mdi-filter-variant"></i> {truncateText(selectedStaff, 13)}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ maxHeight: "150px", overflow: "auto" }}>
                        <Dropdown.Item key={"clear"} style={{ backgroundColor: "#fa9393" }} onClick={() => [handleClearFilter(), setSelectedStaff("Choose Staff")]}>
                          <i className="mdi mdi-close"></i> Clear Selection
                        </Dropdown.Item>
                        {credStaffData?.map((item: any) => (
                          <Dropdown.Item key={item.value} onClick={() => [handleFilter(item.value), setSelectedStaff(item.label)]}>
                            {item.label}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  )}

                  <Button className="btn-sm btn-blue waves-effect waves-light" onClick={toggleUploadModal}>
                    <i className="mdi mdi-upload"></i> Bulk Upload
                  </Button>

                  <Button className="btn-sm btn-blue waves-effect waves-light" onClick={toggleResponsiveModal}>
                    <i className="mdi mdi-plus-circle"></i> Add Student
                  </Button>
                </div>
                {/* <h4 className="header-title mb-4">Manage Student</h4> */}

                <Table
                  columns={user.role == "2" ? credStaffColumns : user.role == "4" ? consultantStaffColumns : columns1}
                  data={filteredItems}
                  pageSize={5}
                  sizePerPageList={sizePerPageList}
                  isSortable={true}
                  pagination={true}
                  isSearchable={true}
                  theadClass="table-light mt-2"
                  searchBoxClass="mt-2 mb-3"
                />
              </>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
});

const Students = () => {
  const dispatch = useDispatch();
  const [credStaffData, setCredStaffData] = useState([]);
  const [sourceData, setSourceData] = useState([]);

  const { state, loading, error, initialLoading } = useSelector((state: RootState) => ({
    state: state.Students.students,
    loading: state?.Students.loading,
    initialLoading: state?.Students.initialLoading,
    error: state?.Students.error,
  }));
  const { user, Authloading, credStaff, ConsultantStaff } = useSelector((state: RootState) => ({
    user: state.Auth.user,
    credStaff: state.AdminStaff.adminStaff.data,
    Authloading: state.Auth.loading,
    ConsultantStaff: state.ConsultantStaff.ConsultantStaffByAdmin.data,
  }));

  const getSourceData = () => {
    axios
      .get("sourceOptions")
      .then((res) => {
        setSourceData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(getAdminStaff());
    getSourceData();
    dispatch(getConsultantStaffByAdmin());
    getStudentBasedOnRole();
  }, []);

  const getStudentBasedOnRole = () => {
    if (user?.role == "4") {
      console.log("Consultant Admin, consultant staff...");
      // based on created
      dispatch(getStudentByCreated());
    } else if (user?.role == "2") {
      console.log("Cred staff...");
      // based on assigned to
      dispatch(getStudentByStaff());
    } else if (user?.role == "7") {
      console.log("Cred staff...");
      // based on assigned to
      dispatch(getStudentByConsultant(user?.consultant_id));
    }
    //  else {
    //   console.log("Other...");
    //   dispatch(getStudent());
    // }
  };

  useEffect(() => {
    if (credStaff) {
      const CredStaffArray = credStaff?.map((staff: any) => ({
        value: staff.user_id,
        label: staff.first_name + " " + staff.last_name,
      }));
      setCredStaffData(CredStaffArray);
    }
  }, [credStaff]);

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Student Management", path: "/users/students" },
          {
            label: "Students",
            path: "/users/students",
            active: true,
          },
        ]}
        title={"Student Management"}
      />
      <Row>
        <Col>
          <BasicInputElements
            state={state?.filter((item: any) => item.status == false)}
            loading={loading}
            error={error}
            user={user}
            credStaffData={credStaffData}
            initialLoading={initialLoading}
            sourceData={sourceData}
            getStudentBasedOnRole={getStudentBasedOnRole}
            consultant_id={user?.consultant_id}
            ConsultantStaff={ConsultantStaff}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default Students;
