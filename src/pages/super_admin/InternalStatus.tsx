import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { withSwal } from "react-sweetalert2";
import { RootState } from "../../redux/store";
import {
  addInternalStatus,
  deleteInternalStatus,
  getInternalStatus,
  updateInternalStatus,
} from "../../redux/internalStatus/actions";
import FeatherIcons from "feather-icons-react";
import PageTitle from "../../components/PageTitle";
import { Button, Card, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import Table from "../../components/Table";
import { internalInitialState, internalValidationState } from "./data";

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

const BasicInputElements = withSwal((props: any) => {
  const dispatch = useDispatch();
  const { swal, state, error, loading, initialLoading } = props;

  const [responsiveModal, setResponsiveModal] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [formData, setFormData] = useState(internalInitialState);
  const [validationErrors, setValidationErrors] = useState(
    internalValidationState
  );

  const handleCancelUpdate = () => {
    setIsUpdate(false);
    setFormData(internalInitialState);
  };

  const toggleResponsiveModal = () => {
    console.log(formData);
    
    setResponsiveModal(!responsiveModal);
    setValidationErrors(internalValidationState);
    if (isUpdate) {
      handleCancelUpdate();
    }
  };

  const validation = yup.object().shape({
    status_name: yup
      .string()
      .trim() // Trim whitespace
      .min(1, "Status name must not be empty")
      .required("Status name is required"),
    status_description: yup
      .string()
      .trim() // Trim whitespace
      .min(1, "Status description must not be empty")
      .required("Status description is required"),
  });

  //Table data
  const records: any = state;

  const handleUpdate = (data: any) => {
    setFormData({
      id: data?.id,
      status_name: data?.status_name,
      status_description: data?.status_description,
    });
    setIsUpdate(true);
  };

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
          dispatch(deleteInternalStatus(id));
          // swal.fire("Deleted!", "Your item has been deleted.", "success");
        }
      });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => {
      return { ...prevData, [name]: value };
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await validation.validate(formData, { abortEarly: false });

      const actionTodispatch = isUpdate
        ? updateInternalStatus(
            formData.id,
            formData.status_name,
            formData.status_description,
          )
        : addInternalStatus(
            formData.status_name.trim(),
            formData.status_description.trim(),
          );

      dispatch(actionTodispatch);

      setFormData(internalInitialState);
      setValidationErrors(internalValidationState);
      toggleResponsiveModal();
    } catch (validationError) {
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
              //   setValidationErrors(initialValidationState);
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
          {/* <Col lg={5} className="bg-white p-3 mr-2"> */}
          <Form onSubmit={onSubmit}>
            <Modal.Header closeButton>
              <h4 className="modal-title">Loan Status Management</h4>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="status_name">
                <Form.Label>Status Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter status name"
                  name="status_name"
                  value={formData.status_name}
                  onChange={handleInputChange}
                />
                {validationErrors.status_name && (
                  <Form.Text className="text-danger">
                    {validationErrors.status_name}
                  </Form.Text>
                )}
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
                {validationErrors.status_description && (
                  <Form.Text className="text-danger">
                    {validationErrors.status_description}
                  </Form.Text>
                )}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                id="button-addon2"
                className="mt-1 ms-2"
                onClick={() =>
                  isUpdate
                    ? [handleCancelUpdate(), toggleResponsiveModal()]
                    : toggleResponsiveModal()
                }
              >
                {isUpdate ? "Cancel" : "Close"}
              </Button>
              <Button
                type="submit"
                variant="success"
                id="button-addon2"
                className="mt-1"
              >
                {isUpdate ? "Update" : "Submit"}
              </Button>
            </Modal.Footer>
            {/* </Col> */}
          </Form>
        </Modal>

        <Col className="form__card p-0">
          <Card className="bg-white">
            <Card.Body>
              <Button
                className="btn-sm btn-blue waves-effect waves-light float-end"
                onClick={toggleResponsiveModal}
              >
                <i className="mdi mdi-plus-circle"></i> Add Internal Status
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

const InternalStatus = () => {
  const dispatch = useDispatch();
  const { InternalStatus, loading, error, initialLoading } = useSelector(
    (state: RootState) => ({
      InternalStatus: state.InternalStatus.status.data,
      loading: state.InternalStatus.loading,
      error: state.InternalStatus.error,
      initialLoading: state.InternalStatus.initialLoading,
    })
  );

  useEffect(() => {
    dispatch(getInternalStatus());
  }, []);

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Status", path: "/status/internal_status" },
          {
            label: "Internal Status",
            path: "/status/internal_status",
            active: true,
          },
        ]}
        title={"Internal Status"}
      />
      <Row>
        <Col>
          <BasicInputElements
            state={InternalStatus}
            loading={loading}
            error={error}
            initialLoading={initialLoading}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default InternalStatus;
