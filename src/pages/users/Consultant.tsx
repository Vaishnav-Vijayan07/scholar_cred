import * as yup from "yup";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Card, Form, Button, Modal, Alert, Spinner } from "react-bootstrap";
import Table from "../../components/Table";
import { withSwal } from "react-sweetalert2";
import FeatherIcons from "feather-icons-react";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import PageTitle from "../../components/PageTitle";
import { MyInitialState, TableRecords, initialState, initialValidationState, sizePerPageList } from "./data";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createConsultant, deleteConsultant, editConsultant, getConsultants, getCredAdminUsers } from "../../redux/actions";
import { RootState } from "../../redux/store";

const BasicInputElements = withSwal((props: any) => {
  const dispatch = useDispatch();
  const { swal, loading, state, error, success, initialLoading } = props;
  const [modal, setModal] = useState<boolean>(false);
  const [className, setClassName] = useState<string>("");

  const [isUpdate, setIsUpdate] = useState(false);
  //Input data
  const [formData, setFormData] = useState<MyInitialState>(initialState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    pin_code: yup
      .string()
      .nullable()
      .required("Pin code is required")
      .matches(/^\d{6}$/, "Pin code must be a valid 6-digit number"),
    pan_no: yup
      .string()
      .nullable()
      .required("PAN number is required")
      .matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, "Invalid PAN number format"),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema), // Integrate yup with react-hook-form
    defaultValues: initialState,
  });

  //handling update logic
  const handleUpdate = (item: any) => {
    setFormData((prev) => ({
      ...prev,
      id: item?.id,
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
          dispatch(deleteConsultant(id));
        }
      });
  };

  //handle onchange function
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    // Limit the length to 10 characters
    if (name == "phone" || name == "alternative_phone") {
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
        // Handle update logic
        await dispatch(
          editConsultant(
            formData.id,
            formData.company_name,
            formData.business_address,
            formData.email,
            formData.phone,
            selectedFile ? selectedFile : null,
            formData.alternative_phone,
            formData.gst,
            formData.location,
            formData.pin_code,
            formData.pan_no,
            1
          )
        );
      } else {
        // Handle add logic
        await dispatch(
          createConsultant(
            formData.company_name,
            formData.business_address,
            formData.email,
            formData.phone,
            selectedFile ? selectedFile : null,
            formData.alternative_phone,
            formData.gst,
            formData.location,
            formData.pin_code,
            formData.pan_no,
            1
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

  useEffect(() => {
    // Check for errors and clear the form
    if (!loading && !error) {
      setValidationErrors(initialValidationState);
      handleCancelUpdate();
      setModal(false);
    }
  }, [loading, error]);

  const columns = [
    {
      Header: "Sl No",
      accessor: "slNo",
      Cell: ({ row }: any) => <>{row.index + 1}</>, // Use row.index to get the row number
      sort: false,
    },
    {
      Header: "Image",
      accessor: "",
      Cell: ({ row }: any) => <div>{row.original.image_url && <img src={`${process.env.REACT_APP_BACKEND_URL}${row.original.image_url}`} alt="comapny logo" width="50" />}</div>,
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

  //set test data
  const setTestData = () => {
    setFormData((prev) => ({
      ...prev,
      company_name: "ABC Corporation",
      business_address: "123 Main Street, Cityville",
      email: "info@abccorp.com",
      phone: "9098765467",
      image_url: "https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
      alternative_phone: "9890987654",
      gst: "GST123456789",
      location: "Business District",
      pin_code: "123450",
      pan_no: "ABCDE1234F",
      created_by: 1,
    }));
  };

  if (initialLoading) {
    return <Spinner animation="border" style={{ position: "absolute", top: "50%", left: "50%" }} />;
  }

  return (
    <>
      <>
        <Row className="justify-content-between px-2">
          <Modal show={modal} onHide={toggle} dialogClassName={className}>
            <h6 className="fw-medium px-3 m-0 py-2 font-13 text-uppercase bg-light">
              <span className="d-block py-1">Consultant Management</span>
            </h6>
            <Modal.Body className="mx-2 my-2">
              <div className="alert alert-warning" role="alert">
                <strong>Hi Admin, </strong> Enter consultant details.
              </div>
              <Row>
                <Col className="bg-white">
                  {error && (
                    <Alert variant="danger" className="my-2">
                      {error}
                    </Alert>
                  )}
                  <Form onSubmit={onSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="company_name">
                          <Form.Label>Company Name</Form.Label>
                          <Form.Control type="text" name="company_name" placeholder="Enter company name" value={formData.company_name} onChange={handleInputChange} />
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
                          <Form.Control type="text" name="phone" placeholder="Enter phone number" maxLength={10} value={formData.phone} onChange={handleInputChange} />
                          {validationErrors.phone && <Form.Text className="text-danger">{validationErrors.phone}</Form.Text>}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="alternative_phone">
                          <Form.Label>Alternative Phone</Form.Label>
                          <Form.Control
                            type="text"
                            name="alternative_phone"
                            placeholder="Enter alternative phone number"
                            maxLength={10}
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
                          placeholder="Enter address"
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
                          <Form.Control
                            type="text"
                            name="gst"
                            placeholder="Enter GST"
                            value={formData.gst}
                            onChange={(e) => {
                              // Allow only alphanumeric characters and limit the length
                              const input = e.target.value
                                .toUpperCase()
                                .replace(/[^A-Za-z0-9]/g, "") // Remove non-alphanumeric characters
                                .slice(0, 15); // Limit to a specific length, adjust as needed

                              handleInputChange({ target: { name: "gst", value: input } });
                            }}
                          />
                          {validationErrors.gst && <Form.Text className="text-danger">{validationErrors.gst}</Form.Text>}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="location">
                          <Form.Label>Location</Form.Label>
                          <Form.Control type="text" name="location" placeholder="Enter location" value={formData.location} onChange={handleInputChange} />
                          {validationErrors.location && <Form.Text className="text-danger">{validationErrors.location}</Form.Text>}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="pin_code">
                          <Form.Label>Pin code</Form.Label>
                          <Form.Control type="number" name="pin_code" placeholder="Enter pin code" value={formData.pin_code} onChange={handleInputChange} />
                          {validationErrors.pin_code && <Form.Text className="text-danger">{validationErrors.pin_code}</Form.Text>}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="pan_no">
                          <Form.Label>PAN Number</Form.Label>
                          {/* <Form.Control type="number" name="pan_no" placeholder="Enter PAN number" value={formData.pan_no} onChange={handleInputChange} /> */}
                          <Form.Control
                            type="text"
                            name="pan_no"
                            placeholder="Enter PAN number"
                            value={formData.pan_no}
                            onChange={(e) => {
                              // Allow only alphanumeric characters and limit the length
                              const input = e.target.value
                                // .replace(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, "")
                                .replace(/[^a-zA-Z0-9]/g, "")
                                .toUpperCase()
                                .slice(0, 10);
                              handleInputChange({ target: { name: "pan_no", value: input } });
                            }}
                            maxLength={10} // Adjust the maxLength based on the actual PAN number length
                          />
                          {validationErrors.pan_no && <Form.Text className="text-danger">{validationErrors.pan_no}</Form.Text>}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="file">
                          <Form.Label>Image</Form.Label>
                          <Form.Control type="file" name="file" placeholder="Enter pin code" onChange={(e: any) => setSelectedFile(e.target.files[0])} />
                          {validationErrors.file && <Form.Text className="text-danger">{validationErrors.file}</Form.Text>}
                          {selectedFile && <img src={URL.createObjectURL(selectedFile)} className="mt-2" alt="selected image" width={100} />}
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

                      <Button type="submit" variant="success" id="button-addon2" className="waves-effect waves-light mt-1 me-2" disabled={loading}>
                        {isUpdate ? "Update" : "Submit"}
                      </Button>
                      <Button variant="success" id="button-addon2" className="waves-effect waves-light mt-1" onClick={setTestData} disabled={loading}>
                        Add test data
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
                {/* <h4 className="header-title mb-4">Manage Consultant</h4> */}
                <Table
                  columns={columns}
                  data={state ? state : []}
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

const Consultants = () => {
  const dispatch = useDispatch();

  const { state, loading, error, success, initialLoading } = useSelector((state: RootState) => ({
    state: state?.ConsultantReducer.consultant.data,
    loading: state?.ConsultantReducer.loading,
    error: state?.ConsultantReducer.error,
    success: state?.ConsultantReducer.success,
    initialLoading: state?.ConsultantReducer.initialLoading,
  }));

  useEffect(() => {
    dispatch(getConsultants());
  }, []);

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
          <BasicInputElements state={state} loading={loading} error={error} success={success} initialLoading={initialLoading} />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default Consultants;
