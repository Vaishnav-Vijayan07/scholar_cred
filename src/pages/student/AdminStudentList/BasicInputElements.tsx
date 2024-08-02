import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Drawer, Button as AntBtn } from "antd";
import { useForm } from "react-hook-form";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Alert,
  Dropdown,
  Spinner,
  Badge,
} from "react-bootstrap";
import Table from "../../../components/Table";
import { withSwal } from "react-sweetalert2";
import FeatherIcons from "feather-icons-react";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import FileUploader from "../../../components/FileUploader";
import {
  StudentDataTypes,
  StudentInitialState,
  StudentValidationState,
  initialState,
  sizePerPageList,
} from "../../users/data";
import { useDispatch } from "react-redux";
import {
  approveStudent,
  createStudent,
  deleteStudent,
  editStudent,
  getStudent,
} from "../../../redux/actions";
import {
  showErrorAlert,
  showSuccessAlert,
  showWarningAlert,
} from "../../../constants/alerts";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { truncateText } from "../../../constants/functons";
import excelDownload from "../../../helpers/excelDownload";
import FilterModal from "../../../components/FilterModal";

interface FileType extends File {
  preview?: string;
  formattedSize?: string;
}

const BasicInputElements = withSwal((props: any) => {
  const {
    swal,
    loading,
    state,
    error,
    user,
    credStaffData,
    initialLoading,
    sourceData,
    path,
    consultantData,
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Table data
  const [filteredItems, setFilteredItems] = useState(state);

  const [isUpdate, setIsUpdate] = useState(false);
  const [passwordResetLoading, setPasswordResetLoading] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState("Choose Staff");
  //Input data
  const [formData, setFormData] =
    useState<StudentDataTypes>(StudentInitialState);
  // Modal states
  const [responsiveModal, setResponsiveModal] = useState<boolean>(false);

  const [clearStates, setClearStates] = useState({
    internal_status_id: [],
    loan_status_id: [],
    assigned_cred_staff: [],
    consultant_name: [],
  });

  const [uploadModal, setUploadModal] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<FileType[]>([]);
  //validation errors
  const [validationErrors, setValidationErrors] = useState(
    StudentValidationState
  );

  //selected table values
  const [selectedValues, setSelectedValues] = useState([]);

  const validationSchema = yup.object().shape({
    first_name: yup.string().trim().required("First name is required"),
    last_name: yup.string().trim().required("Last name is required"),
    email: yup.string().nullable().email("Invalid email format"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be a valid 10-digit number"),
    // date_of_birth: yup.string().required("DOB is required"),
    // country_of_origin: yup.string().nullable(),

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
      // date_of_birth: moment(item.date_of_birth).format("YYYY-MM-DD"),
      // country_of_origin: item.country_of_origin,
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
            // formData.date_of_birth,
            // formData.country_of_origin,
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
            // formData.date_of_birth,
            // formData.country_of_origin,
            formData.application_status,
            formData.source,
            user?.consultant_id
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

  const handleResetPassword = (email: string) => {
    setPasswordResetLoading(true);
    axios
      .post(`reset_student_password`, { email: email })
      .then((res: any) => {
        showSuccessAlert("Password reset successful");
        setPasswordResetLoading(false);
      })
      .catch((err) => {
        setPasswordResetLoading(false);
        showErrorAlert(err);
      });
  };

  useEffect(() => {
    setFilteredItems(state);
  }, [state]);

  const UserColumn = ({ row }: any) => {
    return (
      <>
        <Dropdown className="btn-group" align="end">
          <Dropdown.Toggle
            variant="light"
            className="table-action-btn btn-sm"
            disabled={!row.original.status}
          >
            {row.original.assigned_cred_staff
              ? row.original.assigned_cred_staff
              : "Assign"}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ maxHeight: "150px", overflow: "auto" }}>
            {credStaffData
              ?.filter(
                (staff: any) => staff.label !== row.original.assigned_cred_staff
              )
              .map((item: any) => (
                <Dropdown.Item
                  key={item.value}
                  onClick={() =>
                    handleAssign(row.original.student_id, item.value)
                  }
                >
                  {item.label}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  };

  const handleApprove = (item: any) => {
    Swal.fire({
      title: "Enable student",
      text: "This will move student from deleted list",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    }).then((result: any) => {
      result?.isConfirmed && dispatch(approveStudent(item.student_id));
    });
  };

  const handlePermanent = (id: any) => {
    Swal.fire({
      title: "Are you sure!",
      text: "You want to permanently delete this student?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#55d94e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStudent(id, 1));
      }
    });
  };

  const handleAssign = (student_id: number, staff_id: number) => {
    Swal.fire({
      title: "Are you sure!",
      text: "You want to assign this staff?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#55d94e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, assign!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAssignUser(student_id, staff_id);
        Swal.fire({
          title: "Assigned!",
          text: "Staff assigned successfully.",
          icon: "success",
        });
      }
    });
  };

  const columns = [
    {
      Header: "Sl No",
      accessor: "",
      Cell: ({ row }: any) => <>{row.index + 1}</>, // Use row.index to get the row number
      sort: false,
    },
    {
      Header: "Name",
      accessor: "first_name",
      sort: true,
      Cell: ({ row }: any) => (
        <div>{row.original.first_name + " " + row.original.last_name}</div>
      ),
    },
    // {
    //   Header: "Country",
    //   accessor: "country_of_origin",
    //   sort: false,
    // },
    {
      Header: "Intake Month",
      accessor: "",
      sort: false,
      Cell: ({ row }: any) => (
        <span>
          {moment(row.original.created_at).format("LL")?.split(" ")[0]}
        </span>
      ),
    },
    {
      Header: "Application Status",
      accessor: "application_status_name",
      sort: false,
      Cell: ({ row }: any) => (
        <Badge bg="" className="badge-soft-success text-wrap py-1">
          {row.original.application_status_name}
        </Badge>
      ),
    },
    {
      Header: "Loan Status",
      accessor: "loan_status_name",
      sort: false,
      Cell: ({ row }: any) => (
        <Badge bg="" className="badge-soft-primary text-wrap py-1">
          {row.original.loan_status_name}
        </Badge>
      ),
    },
    {
      Header: "Source",
      accessor: "source_name",
      sort: false,
      Cell: ({ row }: any) => (
        <div>{row.original.source_name || "Not provided"}</div>
      ),
    },
    {
      Header: "Send Password",
      accessor: "",
      sort: false,
      Cell: ({ row }: any) => (
        <div className="d-flex gap-1 justify-content-center align-items-center cursor-pointer">
          <Button
            variant="link"
            onClick={() => {
              if (row.original.email) {
                Swal.fire({
                  title: "Are you sure you want to change the password?",
                  text: "This action cannot be undone.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, Send it!",
                }).then((result: any) => {
                  if (result.isConfirmed) {
                    handleResetPassword(row.original.email);
                  }
                });
              } else {
                Swal.fire({
                  title: "Email is missing",
                  text: "Please provide a valid email address.",
                  icon: "error",
                  confirmButtonColor: "#3085d6",
                });
              }
            }}
          >
            {/* <FeatherIcons icon="mail" size="14" className="cursor-pointer text-secondary me-1" /> */}
            Send Mail
          </Button>
        </div>
      ),
    },
    {
      Header: "Created By",
      accessor: "created_user",
      sort: false,
      Cell: ({ row }: any) => (
        <div>
          {row.original.created_by == 0 ? "App" : row.original.created_user}
        </div>
      ),
    },
    {
      Header: "Loan Type",
      accessor: "",
      sort: false,
      Cell: ({ row }: any) => <div>{row.original.loan_type || "Pending"}</div>,
    },
    {
      Header: "Consultant Name",
      accessor: "consultant_name",
      sort: false,
      Cell: ({ row }: any) => (
        <div>
          {row.original.consultant_name ? (
            <>{row.original.consultant_name}</>
          ) : (
            <>
              <Dropdown className="btn-group" align="end">
                <Dropdown.Toggle
                  variant="light"
                  className="table-action-btn btn-sm btn-blue"
                >
                  <i className="mdi mdi-account-plus"></i> Assign
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ maxHeight: "150px", overflow: "auto" }}>
                  {consultantData?.map((item: any) => (
                    <Dropdown.Item
                      key={item.value}
                      onClick={() =>
                        handleAssignConsultant(
                          row.original.student_id,
                          item.value,
                          row.original.status
                        )
                      }
                    >
                      {item.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}
        </div>
      ),
    },
    {
      Header: "Assigned To",
      accessor: "assigned_cred_staff",
      sort: false,
      Cell: UserColumn,
    },
    {
      Header: "Actions",
      accessor: "",
      sort: false,
      Cell: ({ row }: any) => (
        <div className="d-flex justify-content-center align-items-center gap-2 p-2">
          <div className="d-flex justify-content-center align-items-center gap-2">
            {/* Delete Icon */}
            <Link
              to={`/users/student-details/${row.original.student_id}`}
              state={row.original.student_id}
            >
              <FeatherIcons
                icon="eye"
                size="15"
                className="cursor-pointer text-secondary"
              />
            </Link>
          </div>
          {/* Edit Icon */}
          <FeatherIcons
            icon={
              path === "/cred-admin/deleted-students" ? "check-circle" : "edit"
            }
            size="15"
            style={{ cursor: "pointer" }}
            className="text-success"
            onClick={() => {
              if (path === "/cred-admin/deleted-students") {
                handleApprove(row.original);
              } else {
                handleUpdate(row.original);
                toggleResponsiveModal();
              }
            }}
          />

          {/* Delete Icon */}

          {path !== "/cred-admin/deleted-students" && (
            <FeatherIcons
              icon="trash-2"
              size="15"
              className="cursor-pointer text-secondary"
              onClick={() => handleDelete(row.original.student_id)}
            />
          )}
          {/* <FeatherIcons
            icon="trash-2"
            size="15"
            className="cursor-pointer text-secondary"
            onClick={() => {
              if (path === '/cred-admin/deleted-students') {
                handlePermanent(row.original.student_id);
              } else {
                handleDelete(row.original.student_id);
              }
            }}
          /> */}
        </div>
      ),
    },
  ];

  const handleAssignUser = (student_id: number, assignedTo: number) => {
    axios
      .post("assign_staff", {
        student_id,
        assignedTo,
      })
      .then((res) => {
        dispatch(getStudent());
        // dispatch(getStudent());
      });
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
      setIsLoading(false);
    }
  };

  const handleSelectedValues = (values: any) => {
    console.log(values);
    
    setSelectedValues(values);
  };

  const handleAssignConsultant = (
    studentId: string,
    consultantId: string,
    studentStatus: boolean
  ) => {
    if (!studentStatus) {
      navigate(`/users/student-details/${studentId}`);
      showWarningAlert("Please initiate the student");
      return;
    }
    axios
      .post(`assign_consultant/${studentId}`, { consultant_id: consultantId })
      .then((res) => {
        showSuccessAlert(res.data.message);
        dispatch(getStudent());
      })
      .catch((err) => {
        showErrorAlert("Internal server error..");
      });
  };

  const handleAssignBulk = (student_ids: Array<number>, assignedTo: number) => {
    Swal.fire({
      title: "Are you sure!",
      text: "You want to assign this staff?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#55d94e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, assign!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAssignUserBulk(student_ids, assignedTo);
        Swal.fire({
          title: "Assigned!",
          text: "Staff assigned successfully.",
          icon: "success",
        });
      }
    });
  };

  const handleAssignUserBulk = (
    student_ids: Array<number>,
    assignedTo: number
  ) => {
    axios
      .post("assign_staff_bulk", {
        student_ids,
        assignedTo,
      })
      .then((res) => {
        showSuccessAlert(res.data.message);
        dispatch(getStudent());
      });
  };

  const handleFilter = (staff_id: any) => {
    // Filter the initial list based on the provided category
    const filteredList = state?.filter(
      (item: any) => item.staff_id === staff_id
    );

    // Update the state with the filtered list
    setFilteredItems(filteredList);
  };

  const [filterModal, setFilterModal] = useState<boolean>(false);

  const toggleFilterModal = () => {
    setFilterModal(!filterModal);
  };
  const handleDownload = () => {
    excelDownload(filteredItems, columns);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleClear = () => {
    setFilteredItems(state);
    setVisible(false);
  };

  if (initialLoading) {
    return (
      <Spinner
        animation="border"
        style={{ position: "absolute", top: "50%", left: "50%" }}
      />
    );
  }
  return (
    <>
      <Row className="justify-content-between px-2">
        <Modal
          show={responsiveModal}
          onHide={toggleResponsiveModal}
          dialogClassName="modal-dialog-centered"
        >
          <Form onSubmit={onSubmit}>
            <Modal.Header closeButton>
              <h4 className="modal-title">Student Management</h4>
            </Modal.Header>
            <Modal.Body className="px-3">
              {error && (
                <Alert variant="danger" className="my-2">
                  {error ? error : ""}
                </Alert>
              )}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="first_name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      placeholder="Enter First Name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                    />
                    {validationErrors.first_name && (
                      <Form.Text className="text-danger">
                        {validationErrors.first_name}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="last_name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Second Name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                    />
                    {validationErrors.last_name && (
                      <Form.Text className="text-danger">
                        {validationErrors.last_name}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                    />
                    {validationErrors.email && (
                      <Form.Text className="text-danger">
                        {validationErrors.email}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      maxLength={10}
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    {validationErrors.phone && (
                      <Form.Text className="text-danger">
                        {validationErrors.phone}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              {/* <Row>
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
              </Row> */}

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="source">
                    <Form.Label>Source</Form.Label>
                    <Form.Select
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      aria-label="Default select example"
                    >
                      <option disabled value="" selected>
                        Choose a source...{" "}
                      </option>
                      {sourceData?.map((item: any) => (
                        <option value={item?.id} key={item?.id}>
                          {item?.source_name}
                        </option>
                      ))}
                    </Form.Select>
                    {validationErrors.source && (
                      <Form.Text className="text-danger">
                        {validationErrors.source}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <Button
                type="submit"
                variant="success"
                id="button-addon2"
                className="waves-effect waves-light mt-1 me-2"
                disabled={loading}
              >
                {isUpdate ? "Update" : "Submit"}
              </Button>

              <Button
                variant="danger"
                id="button-addon2"
                disabled={loading}
                className="mt-1 waves-effect waves-light"
                onClick={() => {
                  if (isUpdate) {
                    handleCancelUpdate();
                    toggleResponsiveModal();
                  } else {
                    toggleResponsiveModal();
                    handleCancelUpdate();
                  }
                }}
              >
                {!isUpdate ? "Close" : "Cancel"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* ----------- file upload modal ------ */}

        <Modal
          show={uploadModal}
          onHide={toggleUploadModal}
          dialogClassName="modal-dialog-centered"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <p className="text-muted mb-1 font-small">
              *Please upload the Excel file following the example format.
            </p>
            <FileUploader
              onFileUpload={handleOnFileUpload}
              showPreview={true}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
            <div className="d-flex gap-2 justify-content-end mb-2">
              <Button
                className="btn-sm btn-blue waves-effect waves-light"
                onClick={handleDownloadClick}
              >
                <i className="mdi mdi-download-circle"></i> Download Sample
              </Button>
              <Button
                className="btn-sm btn-success waves-effect waves-light"
                onClick={handleFileUpload}
                disabled={isLoading}
              >
                <i className="mdi mdi-upload"></i> Upload File
              </Button>
            </div>
          </Modal.Body>
        </Modal>
        <FilterModal
          filterModal={visible}
          setFilterModal={onClose}
          data={state}
          setfilteredData={setFilteredItems}
          setIsLoading={setIsLoading}
        />
        {isLoading ? (
          <Spinner
            animation="border"
            style={{ position: "absolute", top: "50%", left: "50%" }}
          />
        ) : (
          <Col className="p-0 form__card">
            <Card className="bg-white">
              <Card.Body>
                <>
                  {path !== "/cred-admin/deleted-students" && (
                    <Row className="d-flex flex-column-reverse flex-md-row">
                      <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-end">
                        <Button
                          className="btn-sm  waves-effect waves-light"
                          onClick={showDrawer}
                          disabled={state.length === 0}
                        >
                          <i className="mdi mdi-filter"></i>
                          {"Filters"}
                        </Button>

                        {user.role == 1 && (
                          <Dropdown className="btn-group">
                            <Dropdown.Toggle
                              disabled={
                                selectedValues?.length > 0 ? false : true
                              }
                              variant="light"
                              className="table-action-btn btn-sm btn-blue"
                            >
                              <i className="mdi mdi-account-plus"></i> Assign
                              Staff
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                              style={{ maxHeight: "150px", overflow: "auto" }}
                            >
                              {credStaffData?.map((item: any) => (
                                <Dropdown.Item
                                  key={item.value}
                                  onClick={() =>
                                    handleAssignBulk(selectedValues, item.value)
                                  }
                                >
                                  {item.label}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        )}

                        <Button
                          className="btn-sm btn-blue waves-effect waves-light"
                          onClick={toggleUploadModal}
                        >
                          <i className="mdi mdi-upload"></i> Bulk Upload
                        </Button>

                        <Button
                          className="btn-sm btn-success waves-effect waves-light"
                          onClick={toggleResponsiveModal}
                        >
                          <i className="mdi mdi-plus-circle"></i> Add Student
                        </Button>
                        <Button
                          className="btn-sm btn-warning waves-effect waves-light"
                          onClick={handleDownload}
                        >
                          <i className="mdi mdi-download"></i> Download data
                        </Button>
                      </div>
                    </Row>
                  )}
                  <Table
                    columns={columns}
                    data={filteredItems}
                    pageSize={5}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    pagination={true}
                    isSearchable={true}
                    isSelectable={true}
                    theadClass="table-light mt-2"
                    searchBoxClass="mt-4 mb-3"
                    onSelect={handleSelectedValues}
                  />
                </>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
});

export default BasicInputElements;
