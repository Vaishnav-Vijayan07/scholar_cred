import * as yup from "yup";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Card, Form, Button, Modal } from "react-bootstrap";
import Table from "../../components/Table";
import { withSwal } from "react-sweetalert2";
import FeatherIcons from "feather-icons-react";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import PageTitle from "../../components/PageTitle";
import { ConsultantData, MyInitialState, TableRecords, initialState, initialValidationState, sizePerPageList } from "./data";
import { Link } from "react-router-dom";

const BasicInputElements = withSwal((props: any) => {
  const { swal, loading } = props;
  const [modal, setModal] = useState<boolean>(false);
  const [className, setClassName] = useState<string>("");

  //Table data
  const records = ConsultantData;
  const [isUpdate, setIsUpdate] = useState(false);
  //Input data
  const [formData, setFormData] = useState<MyInitialState>(initialState);

  //validation errors
  const [validationErrors, setValidationErrors] = useState(initialValidationState);

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

  const methods = useForm({
    resolver: yupResolver(validationSchema), // Integrate yup with react-hook-form
    defaultValues: initialState,
  });

  //handling update logic
  const handleUpdate = (item: any) => {
    setFormData((prev) => ({
      ...prev,
      company_name: item.company_name,
      business_address: item.business_address,
      email: item.email,
      phone: item.phone,
      alternative_phone: item.alternative_phone,
      gst: item.gst,
      location: item.location,
      pin_code: item.pin_code,
      pan_no: item.pan_no,
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
        // Handle update logic
      } else {
        // Handle add logic
      }

      // Clear validation errors
      setValidationErrors(initialValidationState);
      // clear form data
      setFormData(initialState);
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
      Header: "Company Name",
      accessor: "company_name",
      sort: true,
    },
    {
      Header: "Business Address",
      accessor: "business_address",
      sort: false,
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
      Cell: ({ row }: any) => (
        <ul className="list-unstyled">
          <li>{row.original.phone}</li>
          <li>{row.original.alternative_phone}</li>
        </ul>
      ),
    },
    {
      Header: "GST",
      accessor: "gst",
      sort: false,
    },
    {
      Header: "Location",
      accessor: "location",
      sort: false,
    },
    {
      Header: "Pin Code",
      accessor: "pin_code",
      sort: false,
    },
    {
      Header: "Pan No",
      accessor: "pan_no",
      sort: false,
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
              handleUpdate(row.original);
              openModalWithClass("modal-right");
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
    setFormData(initialState);
  };

  //toggle modal
  const toggle = () => {
    setModal(!modal);
  };

  // Opens modal with custom class
  const openModalWithClass = (className: string) => {
    setClassName(className);
    toggle();
  };

  return (
    <>
      <Row className="justify-content-between px-2">
        <Modal show={modal} onHide={toggle} dialogClassName={className}>
          <h6 className="fw-medium px-3 m-0 py-2 font-13 text-uppercase bg-light">
            <span className="d-block py-1">Consultant Management</span>
          </h6>
          <Modal.Body className="mx-2">
            <div className="alert alert-warning" role="alert">
              <strong>Hi Admin, </strong> Enter consultant details.
            </div>
            <Row>
              <Col className="bg-white">
                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="company_name">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control type="text" name="company_name" placeholder="Enter Company name" value={formData.company_name} onChange={handleInputChange} />
                        {validationErrors.company_name && <Form.Text className="text-danger">{validationErrors.company_name}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" name="email" value={formData.email} onChange={handleInputChange} />
                        {validationErrors.email && <Form.Text className="text-danger">{validationErrors.email}</Form.Text>}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleInputChange} />
                        {validationErrors.phone && <Form.Text className="text-danger">{validationErrors.phone}</Form.Text>}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="alternative_phone">
                        <Form.Label>Alternative Phone</Form.Label>
                        <Form.Control
                          type="text"
                          name="alternative_phone"
                          placeholder="Enter Alternative phone number"
                          value={formData.alternative_phone}
                          onChange={handleInputChange}
                        />
                        {validationErrors.alternative_phone && <Form.Text className="text-danger">{validationErrors.alternative_phone}</Form.Text>}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    {/* <Col md={6}> */}
                    <Form.Group className="mb-3" controlId="business_address">
                      <Form.Label>Business Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter adress"
                        className="py-2"
                        name="business_address"
                        value={formData.business_address}
                        onChange={handleInputChange}
                      />
                      {validationErrors.business_address && <Form.Text className="text-danger">{validationErrors.business_address}</Form.Text>}
                    </Form.Group>
                    {/* </Col> */}
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="gst">
                        <Form.Label>GST</Form.Label>
                        <Form.Control type="number" name="gst" placeholder="Enter GST" value={formData.gst} onChange={handleInputChange} />
                        {validationErrors.gst && <Form.Text className="text-danger">{validationErrors.gst}</Form.Text>}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" name="location" placeholder="Enter Location" value={formData.location} onChange={handleInputChange} />
                        {validationErrors.location && <Form.Text className="text-danger">{validationErrors.location}</Form.Text>}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="pin_code">
                        <Form.Label>Pin code</Form.Label>
                        <Form.Control type="number" name="pin_code" placeholder="Enter pin_code" value={formData.pin_code} onChange={handleInputChange} />
                        {validationErrors.pin_code && <Form.Text className="text-danger">{validationErrors.pin_code}</Form.Text>}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="pan_no">
                        <Form.Label>PAN Number</Form.Label>
                        <Form.Control type="number" name="pan_no" placeholder="Enter pan_no" value={formData.pan_no} onChange={handleInputChange} />
                        {validationErrors.pan_no && <Form.Text className="text-danger">{validationErrors.pan_no}</Form.Text>}
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="text-end">
                    <Button
                      variant="danger"
                      id="button-addon2"
                      disabled={loading}
                      className="mt-1 waves-effect waves-light me-2"
                      onClick={() => {
                        if (isUpdate) {
                          handleCancelUpdate();
                          toggle();
                        } else {
                          toggle();
                        }
                      }}
                    >
                      {!isUpdate ? "close" : "Cancel"}
                    </Button>

                    <Button type="submit" variant="success" id="button-addon2" className="waves-effect waves-light mt-1" disabled={loading}>
                      {isUpdate ? "Update" : "Submit"}
                    </Button>
                  </div>
                  {/* )} */}
                </Form>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>

        <Col className="p-0 form__card">
          <Card className="bg-white">
            <Card.Body>
              <Button className="btn-sm btn-blue waves-effect waves-light float-end" onClick={() => openModalWithClass("modal-right")}>
                <i className="mdi mdi-plus-circle"></i> Add Consultant
              </Button>
              <h4 className="header-title mb-4">Manage Consultant</h4>
              <Table columns={columns} data={records ? records : []} pageSize={5} sizePerPageList={sizePerPageList} isSortable={true} pagination={true} isSearchable={true} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
});

const Consultants = () => {
  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Consultant Management", path: "/users/consultant" },
          {
            label: "Consultants",
            path: "/users/consultant",
            active: true,
          },
        ]}
        title={"Consultants"}
      />
      <Row>
        <Col>
          <BasicInputElements />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default Consultants;
