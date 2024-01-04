import * as yup from "yup";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Card, Form, Button, Modal, Alert, Dropdown } from "react-bootstrap";
import Table from "../../components/Table";
import { withSwal } from "react-sweetalert2";
import FeatherIcons from "feather-icons-react";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import FileUploader from "../../components/FileUploader";

// import StudentData from "../../assets/excel/StudentData.xlsx";

// components
import PageTitle from "../../components/PageTitle";
import { StudentDataTypes, StudentInitialState, StudentValidationState, initialState, sizePerPageList } from "../users/data";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdminStaff, getAdminStaff } from "../../redux/adminStaffs/actions";
import { RootState } from "../../redux/store";
import { createStudent, deleteStudent, editStudent, getAllAssignedStudents, getStudent, getStudentByCreated, getStudentByStaff, resetPassword } from "../../redux/actions";
import { showErrorAlert, showSuccessAlert } from "../../constants/alerts";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

interface FileType extends File {
  preview?: string;
  formattedSize?: string;
}

const BasicInputElements = withSwal((props: any) => {
  const { swal, loading, state, error, user, credStaffData } = props;
  const dispatch = useDispatch();

  console.log("credStaffData===>", credStaffData);

  //Table data
  const records = state;
  const [isUpdate, setIsUpdate] = useState(false);
  //Input data
  const [formData, setFormData] = useState<StudentDataTypes>(StudentInitialState);
  // Modal states
  const [responsiveModal, setResponsiveModal] = useState<boolean>(false);
  const [uploadModal, setUploadModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<FileType[]>([]);
  //validation errors
  const [validationErrors, setValidationErrors] = useState(StudentValidationState);

  //selected table values
  const [selectedValues, setSelectedValues] = useState([]);

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
    // application_status: yup.string().oneOf(["Pending", "Approved", "Rejected"]).required(),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema), // Integrate yup with react-hook-form
    defaultValues: initialState,
  });

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
            formData.application_status
          )
        );
      } else {
        // Handle add logic
        dispatch(
          createStudent(formData.first_name, formData.last_name, formData.email, formData.phone, formData.date_of_birth, formData.country_of_origin, formData.application_status)
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

  const UserColumn = ({ row }: any) => {
    return (
      <>
        <Dropdown className="btn-group" align="end">
          <Dropdown.Toggle variant="light" className="table-action-btn btn-sm">
            {row.original.assigned_staff ? row.original.assigned_staff : "Assign"}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ maxHeight: "150px", overflow: "auto" }}>
            {credStaffData?.map((item: any) => (
              <Dropdown.Item key={item.value} onClick={() => handleAssignUser(row.original.student_id, item.value)}>
                {item.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  };

  const columns = [
    {
      Header: "ID",
      accessor: "student_id",
      sort: true,
    },
    {
      Header: "Name",
      accessor: "first_name",
      sort: true,
      Cell: ({ row }: any) => <div>{row.original.first_name + " " + row.original.last_name}</div>,
    },
    {
      Header: "Email",
      accessor: "email",
      sort: false,
    },
    {
      Header: "Phone",
      accessor: "phone",
      sort: false,
    },
    {
      Header: "DOB",
      accessor: "date_of_birth",
      sort: false,
      Cell: ({ row }: any) => <div>{moment(row.original.date_of_birth).format("DD/MM/YYYY")}</div>,
    },
    {
      Header: "Country",
      accessor: "country_of_origin",
      sort: false,
    },
    {
      Header: "Application Status",
      accessor: "application_status",
      sort: false,
    },
    {
      Header: "Assigned Staff",
      accessor: "",
      sort: false,
      Cell: UserColumn,
    },
    {
      Header: "Actions",
      accessor: "",
      sort: false,
      Cell: ({ row }: any) => (
        <div className="d-flex justify-content-center align-items-center gap-2">
          {/* Edit Icon */}
          <FeatherIcons
            icon="edit"
            size="15"
            className="cursor-pointer text-secondary"
            onClick={() => {
              handleUpdate(row.original);
              toggleResponsiveModal();
            }}
          />

          {/* Delete Icon */}
          <FeatherIcons icon="trash-2" size="15" className="cursor-pointer text-secondary" onClick={() => handleDelete(row.original.student_id)} />
        </div>
      ),
    },
  ];

  const handleAssignUser = (student_id: number, assignedTo: number) => {
    console.log("assignedTo", assignedTo, "student_id", student_id);

    axios
      .post("assign_staff", {
        student_id,
        assignedTo,
      })
      .then((res) => {
        console.log("res==>", res.data);
        dispatch(getAllAssignedStudents());
      })
      .catch((err) => console.error(err));
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
      dispatch(getStudent());
      setSelectedFile([]);
      toggleUploadModal();
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleSelectedValues = (values: any) => {
    setSelectedValues(values);
  };

  console.log("selected values =========>", selectedValues);

  const handleAssignUserBulk = (student_ids: Array<number>, assignedTo: number) => {
    console.log("assignedTo", assignedTo, "student_ids", student_ids);

    axios
      .post("assign_staff_bulk", {
        student_ids,
        assignedTo,
      })
      .then((res) => {
        console.log("res==>", res.data);
        showSuccessAlert(res.data.message);
        dispatch(getAllAssignedStudents());
      })
      .catch((err) => console.error(err));
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

            <Button className="btn-sm btn-blue waves-effect waves-light mt-1 float-end" onClick={handleFileUpload} disabled={isLoading}>
              <i className="mdi mdi-upload"></i> Upload File
            </Button>
          </Modal.Body>
        </Modal>

        <Col className="p-0 form__card">
          <Card className="bg-white">
            <Card.Body>
              <>
                <div className="d-flex float-end gap-2">
                  {selectedValues?.length > 0 && (
                    <Dropdown className="btn-group" align="end">
                      <Dropdown.Toggle variant="light" className="table-action-btn btn-sm">
                        Assign Staff
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ maxHeight: "150px", overflow: "auto" }}>
                        {credStaffData?.map((item: any) => (
                          <Dropdown.Item key={item.value} onClick={() => handleAssignUserBulk(selectedValues, item.value)}>
                            {item.label}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  )}

                  <Button className="btn-sm btn-blue waves-effect waves-light " onClick={handleDownloadClick}>
                    <i className="mdi mdi-download-circle"></i> Download Sample
                  </Button>

                  <Button className="btn-sm btn-blue waves-effect waves-light " onClick={toggleUploadModal}>
                    <i className="mdi mdi-upload"></i> Bulk Upload
                  </Button>

                  <Button className="btn-sm btn-blue waves-effect waves-light " onClick={toggleResponsiveModal}>
                    <i className="mdi mdi-plus-circle"></i> Add Student
                  </Button>
                </div>
                {/* <h4 className="header-title mb-4">Manage Student</h4> */}
                <Table
                  columns={columns}
                  data={records ? records : []}
                  pageSize={5}
                  sizePerPageList={sizePerPageList}
                  isSortable={true}
                  pagination={true}
                  isSearchable={true}
                  isSelectable={true}
                  theadClass="table-light mt-2"
                  searchBoxClass="mt-2 mb-3"
                  onSelect={handleSelectedValues}
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

  const { state, loading, error } = useSelector((state: RootState) => ({
    state: state.Students.students,
    loading: state?.Students.loading,
    error: state?.Students.error,
  }));

  const { user, Authloading, credStaff } = useSelector((state: RootState) => ({
    user: state.Auth.user,
    credStaff: state.AdminStaff.adminStaff.data,
    Authloading: state.Auth.loading,
  }));

  console.log("credStaff---------------->", credStaff);

  useEffect(() => {
    dispatch(getAllAssignedStudents());
    dispatch(getAdminStaff());
  }, []);

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
          <BasicInputElements state={state} loading={loading} error={error} user={user} credStaffData={credStaffData} />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default Students;
