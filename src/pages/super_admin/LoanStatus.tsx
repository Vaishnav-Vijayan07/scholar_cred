import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Card, Form, Button, Modal, Spinner } from "react-bootstrap";
import Table from "../../components/Table";

import { withSwal } from "react-sweetalert2";
import FeatherIcons from "feather-icons-react";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import PageTitle from "../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
// import { addStatus, deleteStatus, getStatus, updateStatus } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { addLoanStatus, deleteLoanStatus, getLoanStatus, updateLoanStatus } from "../../redux/actions";
import { FormDataTypes, statusTypes } from "./data";

interface TableRecords {
  id: number;
  status_name: string;
  status_description: string;
  color: string;
}

const sizePerPageList = [
  {
    text: "5",
    value: 5,
  },
  {
    text: "10",
    value: 10,
  },
  {
    text: "20",
    value: 20,
  },
];

const initialState: FormDataTypes = {
  id: "",
  status_name: "",
  status_description: "",
  status_type: "Internal",
  is_visible: false,
};

const initialValidationState = {
  status_name: "",
  status_description: "",
  status_type: "",
};

const BasicInputElements = withSwal((props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { swal, state, error, loading, initialLoading } = props;

  //Table data

  const records: TableRecords[] = state;

  //State for handling update function
  const [isUpdate, setIsUpdate] = useState(false);
  //Input data
  const [formData, setFormData] = useState<FormDataTypes>(initialState);

  // Modal states
  const [responsiveModal, setResponsiveModal] = useState<boolean>(false);

  //validation errors
  const [validationErrors, setValidationErrors] = useState(initialValidationState);

  const validationSchema = yup.object().shape({
    status_name: yup.string().required("Status name is required").min(3, "Status name must be at least 3 characters long"),
    status_description: yup.string().required("Status description is required").min(3, "Status description must be at least 3 characters long"),
  });

  /*
   * form methods
   */
  const methods = useForm({
    resolver: yupResolver(validationSchema), // Integrate yup with react-hook-form
    defaultValues: initialState,
  });

  const handleUpdate = (item: any) => {
    setFormData({
      id: item?.id,
      status_name: item?.status_name,
      status_description: item?.status_description,
      status_type: item?.status_type,
      is_visible: item?.is_visible,
    });

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
          dispatch(deleteLoanStatus(id));
          // swal.fire("Deleted!", "Your item has been deleted.", "success");
        }
      });
  };

  //handle onchange function
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormData((prevData: any) => ({
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

      if (isUpdate) {
        dispatch(updateLoanStatus(formData.id, formData.status_name.trim(), formData.status_description.trim(), formData.is_visible, formData.status_type));
      } else {
        console.log(formData);

        dispatch(addLoanStatus(formData.status_name.trim(), formData.status_description.trim(), formData.is_visible, formData.status_type));
      }

      // Clear validation errors
      setValidationErrors(initialValidationState);

      //clear form data
      setFormData(initialState);

      // ... Rest of the form submission logic ...
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
      Header: "Sl No",
      accessor: "slNo",
      Cell: ({ row }: any) => <>{row.index + 1}</>, // Use row.index to get the row number
      sort: false,
    },
    {
      Header: "Status Name",
      accessor: "status_name",
      sort: true,
    },
    {
      Header: "Status Description",
      accessor: "status_description",
      sort: false,
    },
    {
      Header: "Status Type",
      accessor: "status_type",
      sort: false,
    },
    {
      Header: "Visibility",
      accessor: "is_visible",
      sort: false,
      Cell: ({ row }: any) => <span>{row.original.is_visible ? "Yes" : " No"}</span>,
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
              setValidationErrors(initialValidationState);
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

  const toggleResponsiveModal = () => {
    setResponsiveModal(!responsiveModal);
    setValidationErrors(initialValidationState);
    if (isUpdate) {
      handleCancelUpdate();
    }
  };

  useEffect(() => {
    // Check for errors and clear the form
    if (!loading && !error) {
      //   setValidationErrors();
      handleCancelUpdate();
      setResponsiveModal(false);
    }
  }, [loading, error]);

  console.log("loading=====>", loading);
  console.log("error=====>", error);

  if (initialLoading) {
    return <Spinner animation="border" style={{ position: "absolute", top: "50%", left: "50%" }} />;
  }

  return (
    <>
      <Row className="justify-content-between px-2">
        <Modal show={responsiveModal} onHide={toggleResponsiveModal} dialogClassName="modal-dialog-centered">
          {/* <Col lg={5} className="bg-white p-3 mr-2"> */}
          <Form onSubmit={onSubmit}>
            <Modal.Header closeButton>
              <h4 className="modal-title">Loan Status Management</h4>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="status_name">
                <Form.Label>Status Name</Form.Label>
                <Form.Control type="text" placeholder="Enter status name" name="status_name" value={formData.status_name} onChange={handleInputChange} />
                {validationErrors.status_name && <Form.Text className="text-danger">{validationErrors.status_name}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="status_description">
                <Form.Label>Status Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter status description"
                  rows={5}
                  name="status_description"
                  value={formData.status_description}
                  onChange={handleInputChange}
                />
                {validationErrors.status_description && <Form.Text className="text-danger">{validationErrors.status_description}</Form.Text>}
              </Form.Group>
              <Row className="d-flex align-items-center ">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="source">
                    <Form.Label>Status Types</Form.Label>
                    <Form.Select name="status_type" value={formData.status_type} onChange={handleInputChange} aria-label="Default select example">
                      <option disabled value="" selected>
                        Choose a value
                      </option>
                      <option value="Internal">Internal</option>
                      <option value="External">External</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="source">
                    <Form.Label>Visibility</Form.Label>
                    <div className="d-flex gap-3 align-items-center">
                      <Form.Check type="radio" label="Yes" name="is_visible" id="yes" value="1" onChange={handleInputChange} checked={formData.is_visible == true} />
                      <Form.Check type="radio" label="No" name="is_visible" id="no" value="0" onChange={handleInputChange} checked={formData.is_visible == false} />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" variant="success" id="button-addon2" className="mt-1 me-2">
                {isUpdate ? "Update" : "Submit"}
              </Button>

              <Button
                variant="danger"
                id="button-addon2"
                className="mt-1"
                onClick={() => (isUpdate ? [handleCancelUpdate(), toggleResponsiveModal()] : toggleResponsiveModal(), handleCancelUpdate())}
              >
                {isUpdate ? "Cancel" : "Close"}
              </Button>
            </Modal.Footer>
            {/* </Col> */}
          </Form>
        </Modal>

        <Col className="form__card p-0">
          <Card className="bg-white">
            <Card.Body>
              <Button className="btn-sm btn-blue waves-effect waves-light float-end" onClick={toggleResponsiveModal}>
                <i className="mdi mdi-plus-circle"></i> Add Loan Status
              </Button>
              <h4 className="header-title mb-4">Manage Loan Status</h4>
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
  );
});

const LoanStatusManagement = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { LoanStatus, loading, error, initialLoading } = useSelector((state: RootState) => ({
    LoanStatus: state.LoanStatus.status.data,
    loading: state.LoanStatus.loading,
    error: state.LoanStatus.error,
    initialLoading: state.LoanStatus.initialLoading,
  }));

  useEffect(() => {
    dispatch(getLoanStatus());
  }, []);

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Status", path: "/status/loan_status" },
          { label: "Loan Status", path: "/status/loan_status", active: true },
        ]}
        title={"Loan Status"}
      />
      <Row>
        <Col>
          <BasicInputElements state={LoanStatus} loading={loading} error={error} initialLoading={initialLoading} />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default LoanStatusManagement;
