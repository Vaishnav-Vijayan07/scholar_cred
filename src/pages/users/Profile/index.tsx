import React, { useState } from "react";
import { Row, Col, Card, Tab, Nav, Button, Modal, Form } from "react-bootstrap";
import * as yup from "yup";

// components
import PageTitle from "../../../components/PageTitle";

import UserBox from "./UserBox";
import Table from "../../../components/Table";
import { Link } from "react-router-dom";
import FeatherIcons from "feather-icons-react";
import { sizePerPageList } from "../data";
import { InitialState, InitialValidationState, UserTypes } from "./data";

const Profile = () => {
  // Modal states
  const [responsiveModal, setResponsiveModal] = useState<boolean>(false);
  const [className, setClassName] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState(false);
  //Input data
  const [formData, setFormData] = useState<UserTypes>(InitialState);

  //validation errors
  const [validationErrors, setValidationErrors] = useState(InitialValidationState);
  const records: any = [];

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      sort: true,
    },
    {
      Header: "Name",
      accessor: "name",
      sort: true,
    },
    {
      Header: "Email",
      accessor: "email",
      sort: true,
    },
    {
      Header: "Password",
      accessor: "password",
      sort: true,
    },
    {
      Header: "Actions",
      accessor: "",
      sort: false,
      Cell: ({ row }: any) => (
        <div className="d-flex justify-content-center align-items-center gap-2">
          {/* Edit Icon */}
          <Link to={`/users/consultant/${row.original.id}`}>
            <FeatherIcons icon="eye" size="15" className="cursor-pointer text-secondary" />
          </Link>
          <FeatherIcons
            icon="edit"
            size="15"
            className="cursor-pointer text-secondary"
            onClick={() => {
              // handleUpdate(row.original);
              // openModalWithClass("modal-right");
            }}
          />

          {/* Delete Icon */}
          {/* <FeatherIcons icon="trash-2" size="15" className="cursor-pointer text-secondary" onClick={() => handleDelete(row.original.id)} /> */}
        </div>
      ),
    },
  ];

  const validationSchema = yup.object().shape({
    company_name: yup.string().required("Company name is required"),
    business_address: yup.string().required("Business address is required").min(2, "Address must be at least 2 characters long"),
    email: yup.string().required("Email is required").email("Invalid email format"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be a valid 10-digit number"),
    alternative_phone: yup
      .string()
      .required("Alternative phone number is required")
      .matches(/^\d{10}$/, "Phone number must be a valid 10-digit number"),
    gst: yup.string().required("GST is required"),
    location: yup.string().required("Location is required").min(8, "Location must be at least 8 characters long"),
    pin_code: yup.string().nullable().required("Pin code is required"),
    pan_no: yup.string().nullable().required("PAN number is required"),
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate the form using yup
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      // Validation passed, handle form submission
      if (isUpdate) {
        // Handle update logic
      } else {
        // Handle add logic
      }

      // Clear validation errors
      setValidationErrors(InitialValidationState);
      // clear form data
      setFormData(InitialState);
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
      // handleCancelUpdate();
    }
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Contacts", path: "/apps/contacts/profile" },
          { label: "Profile", path: "/apps/contacts/profile", active: true },
        ]}
        title={"Profile"}
      />
      <Row>
        <Col xl={4} lg={4}>
          {/* User information */}
          <UserBox />
        </Col>
        <Col xl={8} lg={8}>
          <Modal show={responsiveModal} onHide={toggleResponsiveModal} dialogClassName="modal-dialog-centered">
            <Form onSubmit={onSubmit}>
              <Modal.Header closeButton>
                <h4 className="modal-title">User Management</h4>
              </Modal.Header>
              <Modal.Body className="px-3">
                <Form.Group className="mb-3" controlId="last_name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name="first_name" placeholder="Enter first name" value={formData.first_name} onChange={handleInputChange} />
                  {validationErrors.first_name && <Form.Text className="text-danger">{validationErrors.first_name}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="last_name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name="last_name" placeholder="Enter last name" value={formData.last_name} onChange={handleInputChange} />
                  {validationErrors.last_name && <Form.Text className="text-danger">{validationErrors.last_name}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter email" name="email" value={formData.email} onChange={handleInputChange} />
                  {validationErrors.email && <Form.Text className="text-danger">{validationErrors.email}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleInputChange} />
                  {validationErrors.password && <Form.Text className="text-danger">{validationErrors.password}</Form.Text>}
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
                      // handleCancelUpdate();
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
              <h4 className="header-title mb-4">Manage users</h4>
              <Table columns={columns} data={records ? records : []} pageSize={5} sizePerPageList={sizePerPageList} isSortable={true} pagination={true} isSearchable={true} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
