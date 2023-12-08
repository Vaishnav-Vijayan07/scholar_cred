import React, { useDebugValue, useEffect, useState } from "react";
import { Row, Col, Card, Tab, Nav, Button, Modal, Form, Alert } from "react-bootstrap";
import * as yup from "yup";

// components
import PageTitle from "../../../components/PageTitle";

import UserBox from "./UserBox";
import Table from "../../../components/Table";
import { Link, useParams } from "react-router-dom";
import FeatherIcons from "feather-icons-react";
import { sizePerPageList } from "../data";
import { InitialState, InitialValidationState, UserTypes } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { createConsultantAdmin, deleteConsultantAdmin, editConsultantAdmin, getConsultantAdmin, getConsultantsById } from "../../../redux/actions";
import { RootState } from "../../../redux/store";
import { consultant_admin_usertype } from "../../../constants/constant_ids";
import Swal from "sweetalert2";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  // Modal states
  const [responsiveModal, setResponsiveModal] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState(false);
  //Input data
  const [formData, setFormData] = useState<UserTypes>(InitialState);

  //validation errors
  const [validationErrors, setValidationErrors] = useState(InitialValidationState);

  const { consultantDetails, loading, error, staffData, staffLoading } = useSelector((state: RootState) => ({
    consultantDetails: state.ConsultantReducer.consultantById?.data,
    loading: state.ConsultantReducer.loading,
    staffData: state?.ConsultantAdmin.consultantStaff?.data,
    staffLoading: state?.ConsultantAdmin.loading,
    error: state?.ConsultantAdmin.error,
  }));

  const records: any = staffData ? staffData : [];

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
      Header: "Username",
      accessor: "username",
      sort: true,
    },
    {
      Header: "Email",
      accessor: "email",
      sort: true,
    },
    {
      Header: "Credentials",
      accessor: "password",
      sort: true,
    },
    {
      Header: "Status",
      accessor: "password_hash_hash",
      sort: true,
      Cell: ({ row }: any) => <span>{row.original.is_active ? "Active" : "Inactive"}</span>,
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
              // openModalWithClass("modal-right");
              toggleResponsiveModal();
            }}
          />

          {/* Delete Icon */}
          <FeatherIcons icon="trash-2" size="15" className="cursor-pointer text-secondary" onClick={() => handleDelete(row.original.id)} />
        </div>
      ),
    },
  ];

  const handleDelete = (itemId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        // swal.fire("Deleted!", "Your item has been deleted.", "success");
        if (id) {
          dispatch(deleteConsultantAdmin(itemId, consultant_admin_usertype, id));
        }
      }
    });
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required").min(3, "Username must be at least 3 characters long"),
    email: yup.string().required("Email is required").email("Invalid email format"),
    full_name: yup.string().required("Full name is required").min(2, "Full name must be at least 2 characters long"),
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate the form using yup
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      // Validation passed, handle form submission
      if (isUpdate) {
        if (id) {
          dispatch(
            editConsultantAdmin(
              formData?.consultant_staff_id, //id of consultant staff
              formData?.username,
              formData?.email,
              formData?.full_name,
              consultant_admin_usertype, //usertype id
              id //consultant_id
            )
          );
        }
      } else {
        // Handle add logic
        if (id) {
          dispatch(
            createConsultantAdmin(
              formData?.username,
              formData?.email,
              formData?.full_name,
              consultant_admin_usertype, //usertype id
              id //consultant_id
            )
          );
        }
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

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleResponsiveModal = () => {
    setResponsiveModal(!responsiveModal);
    setValidationErrors(InitialValidationState);
    if (isUpdate) {
      handleCancelUpdate();
    }
  };

  //handling update logic
  const handleUpdate = (item: any) => {
    if (id) {
      setFormData((prev) => ({
        ...prev,
        consultant_staff_id: item?.id,
        username: item?.username,
        email: item?.email,
        full_name: item?.full_name,
        user_type_id: item?.user_type_id,
        created_by: item?.created_by,
        consultant_id: id,
      }));

      setIsUpdate(true);
    }
  };

  //handle cancel update section
  const handleCancelUpdate = () => {
    setIsUpdate(false);
    setFormData(InitialState);
    setValidationErrors(InitialValidationState);
  };

  useEffect(() => {
    if (id) {
      dispatch(getConsultantsById(id));

      //user_type and consultant_id
      dispatch(getConsultantAdmin(consultant_admin_usertype, id));
    }
  }, [id]);

  useEffect(() => {
    // Check for errors and clear the form
    if (!staffLoading && !error) {
      handleCancelUpdate();
      if (id) {
        setResponsiveModal(false);
      }
    }
  }, [staffLoading, error]);

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Contacts", path: "/apps/contacts/profile" },
          { label: "Profile", path: "/apps/contacts/profile", active: true },
        ]}
        title={"Consultant Details"}
      />
      <Row>
        <Col xl={4} lg={4}>
          {/* User information */}
          <UserBox consultantDetails={consultantDetails} />
        </Col>
        <Col xl={8} lg={8}>
          <Modal show={responsiveModal} onHide={toggleResponsiveModal} dialogClassName="modal-dialog-centered">
            <Form onSubmit={onSubmit}>
              <Modal.Header closeButton>
                <h4 className="modal-title">Admin Management</h4>
              </Modal.Header>
              <Modal.Body className="px-3">
                {error && (
                  <Alert variant="danger" className="my-2">
                    {error}
                  </Alert>
                )}
                <Form.Group className="mb-3" controlId="full_name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" name="full_name" placeholder="Enter first name" value={formData.full_name} onChange={handleInputChange} />
                  {validationErrors.full_name && <Form.Text className="text-danger">{validationErrors.full_name}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter email" name="email" value={formData.email} onChange={handleInputChange} />
                  {validationErrors.email && <Form.Text className="text-danger">{validationErrors.email}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" name="username" value={formData.username} onChange={handleInputChange} />
                  {validationErrors.username && <Form.Text className="text-danger">{validationErrors.username}</Form.Text>}
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="danger"
                  id="button-addon2"
                  // disabled={loading}
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

                <Button type="submit" variant="success" id="button-addon2" className="waves-effect waves-light mt-1">
                  {isUpdate ? "Update" : "Submit"}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
          <Card className="bg-white">
            <Card.Body>
              <Button className="btn-sm btn-blue waves-effect waves-light float-end" onClick={toggleResponsiveModal}>
                <i className="mdi mdi-plus-circle"></i> Add Users
              </Button>
              <h4 className="header-title mb-4">Admin Login</h4>
              <Table
                columns={columns}
                data={records}
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
  );
};

export default Profile;
