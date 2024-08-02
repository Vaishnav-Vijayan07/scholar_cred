import * as yup from "yup";
import React, {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Alert,
  Spinner,
  Badge,
} from "react-bootstrap";
import Table from "../../components/Table";
import { withSwal } from "react-sweetalert2";
import FeatherIcons from "feather-icons-react";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import PageTitle from "../../components/PageTitle";
import {
  MyInitialState,
  initialState,
  initialValidationState,
  sizePerPageList,
} from "./data";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createConsultant,
  deleteConsultant,
  editConsultant,
  getConsultants,
  getCredAdminUsers,
} from "../../redux/actions";
import { RootState } from "../../redux/store";
// import { CustomCropper } from "./CustomCropper";
const CustomCropper = React.lazy(() => import("./CustomCropper"));

const BasicInputElements = withSwal((props: any) => {
  const dispatch = useDispatch();
  const { swal, loading, state, error, success, initialLoading } = props;
  const [modal, setModal] = useState<boolean>(false);
  const [className, setClassName] = useState<string>("");

  const [isUpdate, setIsUpdate] = useState(false);

  const [blobData, setBlobdata] = useState<any>({
    img: null,
    alt: null,
  });

  //Input data
  const [formData, setFormData] = useState<MyInitialState>(initialState);
  const [fileErrors, setFileErrors] = useState<{ image: string; alt: string }>({
    image: "",
    alt: "",
  });

  const [cropConfig, setCropConfig] = useState({
    img: false,
    alt: false,
  });
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [images, setImages] = useState<any>({
    image: { type: null, url: null },
    altImage: { type: null, url: null },
  });
  const [croppedFile, setCroppedFile] = useState({
    croppedImage: "",
    croppedAltImage: "",
  });
  const [showModal, setShowModal] = useState(false);

  //validation errors
  const [validationErrors, setValidationErrors] = useState(
    initialValidationState
  );

  const validationSchema = yup.object().shape({
    company_name: yup.string().trim().required("Company name is required"),
    business_address: yup
      .string()
      .trim()
      .required("Business address is required")
      .min(2, "Address must be at least 2 characters long"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be a valid 10-digit number"),
    alternative_phone: yup
      .string()
      .required("Alternative phone number is required")
      .matches(/^\d{10}$/, "Phone number must be a valid 10-digit number"),
    gst: yup.string().required("GST is required"),
    location: yup
      .string()
      .trim()
      .required("Location is required")
      .min(3, "Location must be at least 3 characters long"),
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
      // isForex: item.isforexenabled,
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
    const { name, value, checked } = e.target;

    if (name === "isForex") {

      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
      return;
    }

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

  const fileInputImgRef: any = useRef(null);
  const fileInputAltRef: any = useRef(null);

  const handleClear = (type: string) => {
    if (type === "image") {
      fileInputImgRef.current.value = "";
    } else {
      fileInputAltRef.current.value = "";
    }
  };


  //handle form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      // Validation passed, handle form submission
      if (isUpdate) {
        // Handle update logic

        dispatch(
          editConsultant(
            formData.id,
            formData.company_name,
            formData.business_address,
            formData.email,
            formData.phone,
            blobData ? blobData.img : null,
            blobData ? blobData.alt : null,
            formData.alternative_phone,
            formData.gst,
            formData.location,
            formData.pin_code,
            formData.pan_no,
            // formData?.isForex,
            1
          )
        );
      } else {
        // if (blobData.img == null || blobData.alt == null) {
        //   if (!blobData.img) {
        //     setFileErrors((prev) => ({ ...prev, image: "Choose an image" }));
        //   }
        //   if (!blobData.alt) {
        //     setFileErrors((prev) => ({ ...prev, alt: "Choose an image" }));
        //   }
        //   return;
        // }

        // Handle add logic


        dispatch(
          createConsultant(
            formData.company_name,
            formData.business_address,
            formData.email,
            formData.phone,
            blobData ? blobData.img : null,
            blobData ? blobData.alt : null,
            formData.alternative_phone,
            formData.gst,
            formData.location,
            formData.pin_code,
            formData.pan_no,
            // formData?.isForex,
            1
          )
        );
      }
      setCroppedFile({ croppedAltImage: "", croppedImage: "" });
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
      accessor: "",
      Cell: ({ row }: any) => <>{row.index + 1}</>, // Use row.index to get the row number
      sort: false,
    },
    {
      Header: "Image",
      accessor: "",
      Cell: ({ row }: any) => (
        <div>
          {row.original.image_url && (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}${row.original.image_url}`}
              alt="comapny logo"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      Header: "Alt Image",
      accessor: "",
      Cell: ({ row }: any) => (
        <div>
          {row.original?.second_image_url && (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}${row.original.second_image_url}`}
              alt="comapny logo"
              width="50"
            />
          )}
        </div>
      ),
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
    // {
    //   Header: "Forex Privilage",
    //   accessor: "",
    //   sort: false,
    //   Cell: ({ row }: any) => (
    //     <p>
    //       {row.original?.isforexenabled ? (
    //         <Badge bg="success">Allowed</Badge>
    //       ) : (
    //         <Badge bg="danger">Not allowed</Badge>
    //       )}
    //     </p>
    //   ),
    // },
    {
      Header: "Actions",
      accessor: "",
      sort: false,
      Cell: ({ row }: any) => (
        <div className="d-flex justify-content-center align-items-center gap-2">
          {/* Edit Icon */}
          <Link to={`/users/consultant/${row.original.id}`}>
            <FeatherIcons
              icon="eye"
              size="15"
              className="cursor-pointer text-secondary"
            />
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
          <FeatherIcons
            icon="trash-2"
            size="15"
            className="cursor-pointer text-secondary"
            onClick={() => handleDelete(row.original.id)}
          />
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
    setCroppedFile({ croppedAltImage: "", croppedImage: "" });
    setValidationErrors(initialValidationState);
  };

  const toggleImageModal = () => {
    setCropConfig({ img: false, alt: false });
    setShowModal(!showModal);
  };

  // Opens modal with custom class
  const openModalWithClass = (className: string) => {
    setClassName(className);
    toggle();
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
      <>
        <Row className="justify-content-between px-2">
          <Modal show={modal} onHide={toggle} dialogClassName={className}>
            <h6 className="fw-medium px-3 m-0 py-2 font-13 text-uppercase bg-light">
              <span className="d-block py-1">Consultant Management</span>
            </h6>
            <Modal.Body className="mx-2 my-2">
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
                          <Form.Control
                            type="text"
                            name="company_name"
                            placeholder="Enter company name"
                            value={formData.company_name}
                            onChange={handleInputChange}
                          />
                          {validationErrors.company_name && (
                            <Form.Text className="text-danger">
                              {validationErrors.company_name}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                          {validationErrors.email && (
                            <Form.Text className="text-danger">
                              {validationErrors.email}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="phone">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="text"
                            name="phone"
                            placeholder="Enter phone number"
                            maxLength={10}
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

                      <Col md={6}>
                        <Form.Group
                          className="mb-3"
                          controlId="alternative_phone"
                        >
                          <Form.Label>Alternative Phone</Form.Label>
                          <Form.Control
                            type="text"
                            name="alternative_phone"
                            placeholder="Enter alternative phone number"
                            maxLength={10}
                            value={formData.alternative_phone}
                            onChange={handleInputChange}
                          />
                          {validationErrors.alternative_phone && (
                            <Form.Text className="text-danger">
                              {validationErrors.alternative_phone}
                            </Form.Text>
                          )}
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
                        {validationErrors.business_address && (
                          <Form.Text className="text-danger">
                            {validationErrors.business_address}
                          </Form.Text>
                        )}
                      </Form.Group>
                      {/* </Col> */}
                    </Row>

                    {/* <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Allow Forex Privilege</Form.Label>
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            name="isForex"
                            // defaultValue={formData?.isForex ? true : false}
                            defaultChecked={formData?.isForex}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row> */}

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

                              handleInputChange({
                                target: { name: "gst", value: input },
                              });
                            }}
                          />
                          {validationErrors.gst && (
                            <Form.Text className="text-danger">
                              {validationErrors.gst}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="location">
                          <Form.Label>Location</Form.Label>
                          <Form.Control
                            type="text"
                            name="location"
                            placeholder="Enter location"
                            value={formData.location}
                            onChange={handleInputChange}
                          />
                          {validationErrors.location && (
                            <Form.Text className="text-danger">
                              {validationErrors.location}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="pin_code">
                          <Form.Label>Pin code</Form.Label>
                          <Form.Control
                            type="number"
                            name="pin_code"
                            placeholder="Enter pin code"
                            value={formData.pin_code}
                            onChange={handleInputChange}
                          />
                          {validationErrors.pin_code && (
                            <Form.Text className="text-danger">
                              {validationErrors.pin_code}
                            </Form.Text>
                          )}
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
                              handleInputChange({
                                target: { name: "pan_no", value: input },
                              });
                            }}
                            maxLength={10} // Adjust the maxLength based on the actual PAN number length
                          />
                          {validationErrors.pan_no && (
                            <Form.Text className="text-danger">
                              {validationErrors.pan_no}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="file">
                          <Form.Label>Image</Form.Label>
                          <Form.Control
                            ref={fileInputImgRef}
                            itemRef={fileInputImgRef}
                            type="file"
                            name="file"
                            placeholder="Enter pin code"
                            onClick={() => handleClear("image")}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const file: any = e.target.files?.[0];
                              // Check if the file type starts with "image/"
                              if (file.type && file.type.startsWith("image/")) {
                                setImages((prev: any) => ({
                                  ...prev,
                                  image: {
                                    type: file.type.split("/").pop(),
                                    url: URL.createObjectURL(file),
                                  },
                                  altImage: { type: null, url: null },
                                }));
                                setShowModal(!showModal);

                                setFileErrors((prev) => ({
                                  ...prev,
                                  image: "",
                                }));
                                setCropConfig((prev) => ({
                                  ...prev,
                                  image: true,
                                }));
                              } else {
                                setCroppedFile((prev: any) => ({
                                  ...prev,
                                  croppedImage: null,
                                }));
                                setFileErrors((prev) => ({
                                  ...prev,
                                  image: "Choose proper image file",
                                }));
                              }
                            }}
                          />
                          {fileErrors?.image && (
                            <Form.Text className="text-danger">
                              {fileErrors?.image}
                            </Form.Text>
                          )}
                          {croppedFile?.croppedImage && (
                            <img
                              src={croppedFile?.croppedImage}
                              className="mt-2"
                              alt="selected image"
                              width={150}
                            />
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="file">
                          <Form.Label>Alt Image</Form.Label>
                          <Form.Control
                            ref={fileInputAltRef}
                            itemRef={fileInputAltRef}
                            onClick={() => handleClear("alt")}
                            type="file"
                            name="second_file"
                            placeholder="Enter pin code"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const file: any = e.target.files?.[0];
                              if (file) {
                                if (
                                  file.type &&
                                  file.type.startsWith("image/")
                                ) {
                                  setImages((prev: any) => ({
                                    ...prev,
                                    altImage: {
                                      type: file.type.split("/").pop(),
                                      url: URL.createObjectURL(file),
                                    },
                                    image: { type: null, url: null },
                                  }));
                                  setShowModal(!showModal);
                                  setFileErrors((prev) => ({
                                    ...prev,
                                    alt: "",
                                  }));
                                  setCropConfig((prev) => ({
                                    ...prev,
                                    alt: true,
                                  }));
                                } else {
                                  setCroppedFile((prev: any) => ({
                                    ...prev,
                                    croppedAltImage: null,
                                  }));
                                  setFileErrors((prev) => ({
                                    ...prev,
                                    alt: "Choose proper image file",
                                  }));
                                }
                              }
                            }}
                          />
                          {fileErrors.alt && (
                            <Form.Text className="text-danger">
                              {fileErrors.alt}
                            </Form.Text>
                          )}
                          {croppedFile.croppedAltImage && (
                            <img
                              src={croppedFile.croppedAltImage}
                              className="mt-2"
                              alt="selected image"
                              width={50}
                            />
                          )}
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
                            handleCancelUpdate();
                          }
                        }}
                      >
                        {!isUpdate ? "Close" : "Cancel"}
                      </Button>

                      <Button
                        type="submit"
                        variant="success"
                        id="button-addon2"
                        className="waves-effect waves-light mt-1"
                        disabled={loading}
                      >
                        {isUpdate ? "Update" : "Submit"}
                      </Button>
                    </div>
                    {/* )} */}
                  </Form>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>

          <Modal
            show={showModal}
            onHide={toggleImageModal}
            dialogClassName=" modal-right"
            // centered
          >
            <Modal.Body>
              <Suspense fallback={null}>
                <CustomCropper
                  imageFile={images}
                  cropConfig={cropConfig}
                  setCroppedFile={setCroppedFile}
                  setSelectedFile={setSelectedFile}
                  setShowModal={setShowModal}
                  setCropConfig={setCropConfig}
                  setBlobdata={setBlobdata}
                />
              </Suspense>
            </Modal.Body>
          </Modal>

          <Col className="p-0 form__card">
            <Card className="bg-white">
              <Card.Body>
                <div className="d-flex float-end gap-2">
                  <Button
                    className="btn-sm btn-blue waves-effect waves-light"
                    onClick={() => openModalWithClass("modal-right")}
                  >
                    <i className="mdi mdi-plus-circle"></i> Add Consultant
                  </Button>
                </div>
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

  const { state, loading, error, success, initialLoading } = useSelector(
    (state: RootState) => ({
      state: state?.ConsultantReducer.consultant.data,
      loading: state?.ConsultantReducer.loading,
      error: state?.ConsultantReducer.error,
      success: state?.ConsultantReducer.success,
      initialLoading: state?.ConsultantReducer.initialLoading,
    })
  );

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
          <BasicInputElements
            state={state}
            loading={loading}
            error={error}
            success={success}
            initialLoading={initialLoading}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default Consultants;
