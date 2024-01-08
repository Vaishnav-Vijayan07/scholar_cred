import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, Modal, Alert, Spinner } from "react-bootstrap";
import Table from "../../components/Table";
import { withSwal } from "react-sweetalert2";
import FeatherIcons from "feather-icons-react";

// components
import PageTitle from "../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
// import { createadminStaff, deleteAdminStaff, editAdminStaff, getAdminStaff } from "../../redux/adminStaffs/actions";
import { createAdminUsers, deleteAdminUsers, editAdminUsers, getCredAdminUsers, resetPassword } from "../../redux/admin_users/actions";
import { RootState } from "../../redux/store";
import { AdminUsersType, AdminInitialState, AdminValidationState, sizePerPageList } from "./data";
import { Link } from "react-router-dom";

const BasicInputElements = withSwal((props: any) => {
  const { swal, loading, state, error, initialLoading } = props;
  const dispatch = useDispatch();

  //Table data
  const records = state;
  const [isUpdate, setIsUpdate] = useState(false);
  //Input data
  const [formData, setFormData] = useState<AdminUsersType>(AdminInitialState);
  // Modal states
  const [responsiveModal, setResponsiveModal] = useState<boolean>(false);
  //validation errors
  const [validationErrors, setValidationErrors] = useState(AdminValidationState);

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().required("Email is required").email("Invalid email format"),
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
  });

  //handling update logic
  const handleUpdate = (item: any) => {
    setFormData((prev) => ({
      ...prev,
      id: item.id,
      first_name: item.full_name.split(" ")[0],
      last_name: item.full_name.split(" ")[1],
      email: item.email,
      phone: item.phone,
      username: item.username,
      user_type_id: item.user_type_id,
      created_by: item.created_by,
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
          dispatch(deleteAdminUsers(id));
        }
      });
  };

  //handle onchange function
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //handle form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate the form using yup
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      // Validation passed, handle form submission
      if (isUpdate) {
        dispatch(editAdminUsers(formData.id, formData.username, formData.email, formData.first_name + " " + formData.last_name, formData.user_type_id, formData.created_by));
      } else {
        dispatch(createAdminUsers(formData.username, formData.email, formData.first_name + " " + formData.last_name, formData.user_type_id, formData.created_by));
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

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      sort: true,
    },
    {
      Header: "Name",
      accessor: "full_name",
      sort: true,
    },
    {
      Header: "Email",
      accessor: "email",
      sort: false,
    },
    {
      Header: "Username",
      accessor: "username",
      sort: false,
    },
    {
      Header: "Password",
      accessor: "",
      sort: false,
      Cell: ({ row }: any) => (
        <div className="d-flex gap-1 justify-content-center align-items-center cursor-pointer">
          <Button
            variant="link"
            onClick={() => {
              swal
                .fire({
                  title: "Are you sure you want to change the password?",
                  text: "This action cannot be undone.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, Send it!",
                })
                .then((result: any) => {
                  if (result.isConfirmed) {
                    dispatch(resetPassword(row.original.email));
                  }
                });
            }}
          >
            {/* <FeatherIcons icon="mail" size="14" className="cursor-pointer text-secondary me-1" /> */}
            Send Mail
          </Button>
        </div>
      ),
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
          <FeatherIcons icon="trash-2" size="15" className="cursor-pointer text-secondary" onClick={() => handleDelete(row.original.id)} />
        </div>
      ),
    },
  ];

  //handle cancel update section
  const handleCancelUpdate = () => {
    setIsUpdate(false);
    setFormData(AdminInitialState);
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
      last_name: "doe ",
      username: "sanufeliz",
      email: "john.doe@example.com",
      user_type_id: "1",
      created_by: "1",
    }));
  };

  useEffect(() => {
    // Check for errors and clear the form
    if (!loading && !error) {
      setValidationErrors(AdminValidationState);
      handleCancelUpdate();
      setResponsiveModal(false);
    }
  }, [loading, error]);

  if (initialLoading) {
    return <Spinner animation="border" style={{ position: "absolute", top: "50%", left: "50%" }} />;
  }

  return (
    <>
      <>
        <Row className="justify-content-between px-2">
          <Modal show={responsiveModal} onHide={toggleResponsiveModal} dialogClassName="modal-dialog-centered">
            <Form onSubmit={onSubmit}>
              <Modal.Header closeButton>
                <h4 className="modal-title">Add Cred Admin Users</h4>
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
                      <Form.Control type="text" name="first_name" placeholder="Enter  Name" value={formData.first_name} onChange={handleInputChange} />
                      {validationErrors.first_name && <Form.Text className="text-danger">{validationErrors.first_name}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="last_name">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" name="last_name" placeholder="Enter  Name" value={formData.last_name} onChange={handleInputChange} />
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
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label>User Name</Form.Label>
                      <Form.Control type="text" name="username" placeholder="Enter username" value={formData.username} onChange={handleInputChange} />
                      {validationErrors.username && <Form.Text className="text-danger">{validationErrors.username}</Form.Text>}
                    </Form.Group>
                  </Col>
                </Row>{" "}
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
                  {!isUpdate ? "close" : "Cancel"}
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

          <Col className="p-0 form__card">
            <Card className="bg-white">
              <Card.Body>
                <Button className="btn-sm btn-blue waves-effect waves-light float-end" onClick={toggleResponsiveModal}>
                  <i className="mdi mdi-plus-circle"></i> Add user
                </Button>
                {/* <h4 className="header-title mb-4">Manage Cred Admin</h4> */}
                <Table
                  columns={columns}
                  data={records ? records : []}
                  pageSize={5}
                  sizePerPageList={sizePerPageList}
                  isSortable={true}
                  pagination={true}
                  isSearchable={true}
                  theadClass="table-light mt-2"
                  searchBoxClass="mt-2 mb-3"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    </>
  );
});

const AdminUsers = () => {
  const dispatch = useDispatch();

  const { state, loading, error, initialLoading } = useSelector((state: RootState) => ({
    state: state.CredAdminStates.credAdmin,
    loading: state?.CredAdminStates.loading,
    error: state?.CredAdminStates.error,
    initialLoading: state?.CredAdminStates?.initialLoading,
  }));

  useEffect(() => {
    dispatch(getCredAdminUsers());
  }, []);

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Cred Admin Management", path: "/users/cred_admin_users" },
          {
            label: "Cred Admin Users",
            path: "/users/cred_admin_users",
            active: true,
          },
        ]}
        title={"Cred Admin Management"}
      />
      <Row>
        <Col>
          <BasicInputElements state={state} loading={loading} error={error} initialLoading={initialLoading} />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default AdminUsers;
