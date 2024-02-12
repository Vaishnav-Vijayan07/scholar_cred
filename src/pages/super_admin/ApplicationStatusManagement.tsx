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
import { addStatus, deleteStatus, getStatus, updateStatus } from "../../redux/actions";

interface TableRecords {
  id: number;
  status_name: string;
  status_description: string;
  color: string;
}

interface FormDataType {
  id: string;
  status_name: string;
  status_description: string;
  status_type: "Internal" | "External";
  is_visible: Boolean;
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

const initialState: FormDataType = {
  id: "",
  status_name: "",
  status_description: "",
  status_type: "Internal",
  is_visible: true,
};

const initialValidationState = {
  status_name: "",
  status_description: "",
  status_type: "",
  is_visible: "",
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
  const [formData, setFormData] = useState<FormDataType>(initialState);

  // Modal states
  const [responsiveModal, setResponsiveModal] = useState<boolean>(false);

  //validation errors
  const [validationErrors, setValidationErrors] = useState(initialValidationState);

  const validationSchema = yup.object().shape({
    status_name: yup.string().required("status name is required").min(3, "status name must be at least 3 characters long"),
    status_description: yup.string().required("status description is required").min(3, "status description must be at least 3 characters long"),
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
          dispatch(deleteStatus(id));
          // swal.fire("Deleted!", "Your item has been deleted.", "success");
        }
      });
  };

  //handle onchange function
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    console.log("e.target", e.target);

    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log("formdata========>", formData);

  //handle form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form using yup
    try {
      await validationSchema.validate(formData, { abortEarly: false });

      if (isUpdate) {
        dispatch(updateStatus(formData.id, formData.status_name, formData.status_description, formData.status_type, formData.is_visible));
      } else {
        dispatch(addStatus(formData.status_name, formData.status_description, formData.status_type, formData.is_visible));
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
      Header: "ID",
      accessor: "id",
      sort: true,
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
          {/* <FeatherIcons icon="trash-2" size="15" className="cursor-pointer text-secondary" onClick={() => handleDelete(row.original.id)} /> */}
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
      console.log("here");

      //   setValidationErrors();
      handleCancelUpdate();
      setResponsiveModal(false);
    }
  }, [loading, error]);

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
              <h4 className="modal-title">Application Status</h4>
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

              <Form.Group className="mb-3" controlId="status_type">
                <Form.Label>Status Type</Form.Label>
                <Form.Select name="status_type" value={formData.status_type} onChange={handleInputChange} aria-label="Default select example">
                  <option disabled value="">
                    Choose a source...
                  </option>
                  <option value="Internal">Internal</option>
                  <option value="External">External</option>
                </Form.Select>
                {validationErrors.status_type && <Form.Text className="text-danger">{validationErrors.status_type}</Form.Text>}
              </Form.Group>

              <Form.Group controlId="formRadioGroup">
                <Form.Label>Visibility:</Form.Label>
                <Form.Check type="radio" label="Yes" id="yes-radio" name="is_visible" value="1" checked={formData.is_visible == true} onChange={handleInputChange} />
                <Form.Check type="radio" label="No" id="no-radio" name="is_visible" value="0" checked={formData.is_visible == false} onChange={handleInputChange} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                id="button-addon2"
                className="mt-1 ms-2"
                onClick={() => (isUpdate ? [handleCancelUpdate(), toggleResponsiveModal()] : toggleResponsiveModal())}
              >
                {isUpdate ? "Cancel" : "Close"}
              </Button>
              <Button type="submit" variant="success" id="button-addon2" className="mt-1">
                {isUpdate ? "Update" : "Submit"}
              </Button>
            </Modal.Footer>
            {/* </Col> */}
          </Form>
        </Modal>

        <Col className="form__card p-0">
          <Card className="bg-white">
            <Card.Body>
              <Button className="btn-sm btn-blue waves-effect waves-light float-end" onClick={toggleResponsiveModal}>
                <i className="mdi mdi-plus-circle"></i> Add Status
              </Button>
              <h4 className="header-title mb-4">Manage Status</h4>
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

const StatusManagement = () => {
  const dispatch = useDispatch<AppDispatch>();

  //Fetch data from redux store
  //   const Status = useSelector((state: RootState) => state.Status.status.data);

  const { Status, loading, error, initialLoading } = useSelector((state: RootState) => ({
    Status: state.Status.status.data,
    loading: state.Status.loading,
    error: state.Status.error,
    initialLoading: state.Status.initialLoading,
  }));

  useEffect(() => {
    dispatch(getStatus());
  }, []);

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Status", path: "/status/status_management" },
          { label: "Status Management", path: "/status/status_management", active: true },
        ]}
        title={"Application Status"}
      />
      <Row>
        <Col>
          <BasicInputElements state={Status} loading={loading} error={error} initialLoading={initialLoading} />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default StatusManagement;
