import * as yup from "yup";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Card, Form, Button, Modal, Alert } from "react-bootstrap";
import Table from "../../components/Table";
import { withSwal } from "react-sweetalert2";
import FeatherIcons from "feather-icons-react";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import PageTitle from "../../components/PageTitle";
import { StaffInitialState, StaffInitialValidationState, StaffTypes, initialState, sizePerPageList } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { createadminStaff, deleteAdminStaff, editAdminStaff, getAdminStaff } from "../../redux/adminStaffs/actions";
import { RootState } from "../../redux/store";

const BasicInputElements = withSwal((props: any) => {
  const { swal, loading, state, error } = props;
  const dispatch = useDispatch();

  //Table data
  const records = state;
  const [isUpdate, setIsUpdate] = useState(false);
  //Input data
  const [formData, setFormData] = useState<StaffTypes>(StaffInitialState);
  // Modal states
  const [responsiveModal, setResponsiveModal] = useState<boolean>(false);
  //validation errors
  const [validationErrors, setValidationErrors] = useState(StaffInitialValidationState);

  const validationSchema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup.string().required("Email is required").email("Invalid email format"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be a valid 10-digit number"),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema), // Integrate yup with react-hook-form
    defaultValues: initialState,
  });

  //handling update logic
  const handleUpdate = (item: any) => {
    setFormData((prev) => ({
      ...prev,
      id: item.id,
      first_name: item.first_name,
      last_name: item.last_name,
      email: item.email,
      phone: item.phone,
      image: item.image,
      employee_id: item.employee_id,
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
          dispatch(deleteAdminStaff(id));
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
        dispatch(editAdminStaff(formData.id, formData.first_name, formData.last_name, formData.email, formData.phone, formData.image, formData.employee_id, 1));
      } else {
        // Handle add logic
        dispatch(createadminStaff(formData.first_name, formData.last_name, formData.email, formData.phone, formData.image, formData.employee_id, 1));
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
      Header: "First Name",
      accessor: "first_name",
      sort: true,
    },
    {
      Header: "Last Name",
      accessor: "last_name",
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
    },
    // {
    //   Header: "Image",
    //   accessor: "image",
    //   sort: false,
    //   Cell: ({ row }: any) => (
    //     <>
    //       <img src={row.original.image} alt="user image" width={50} />
    //     </>
    //   ),
    // },
    {
      Header: "Employee Id",
      accessor: "employee_id",
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
    setFormData(StaffInitialState);
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
      last_name: "Doe",
      email: "john.doe@example.com",
      phone: "9876545678",
      image: "https://example.com/john-doe.jpg",
      employee_id: "EMP001",
      created_by: 1,
    }));
  };

  useEffect(() => {
    // Check for errors and clear the form
    if (!loading && !error) {
      setValidationErrors(StaffInitialValidationState);
      handleCancelUpdate();
      setResponsiveModal(false);
    }
  }, [loading, error]);

  return (
    <>
      <Row className="justify-content-between px-2">
        <Modal show={responsiveModal} onHide={toggleResponsiveModal} dialogClassName="modal-dialog-centered">
          <Form onSubmit={onSubmit}>
            <Modal.Header closeButton>
              <h4 className="modal-title">Staff Management</h4>
            </Modal.Header>
            <Modal.Body className="px-4">
              {error && (
                <Alert variant="danger" className="my-2">
                  {error}
                </Alert>
              )}
              <Form.Group className="mb-3" controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="first_name" placeholder="Enter First Name" value={formData.first_name} onChange={handleInputChange} />
                {validationErrors.first_name && <Form.Text className="text-danger">{validationErrors.first_name}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Second Name" name="last_name" value={formData.last_name} onChange={handleInputChange} />
                {validationErrors.last_name && <Form.Text className="text-danger">{validationErrors.last_name}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange} />
                {validationErrors.email && <Form.Text className="text-danger">{validationErrors.email}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleInputChange} />
                {validationErrors.phone && <Form.Text className="text-danger">{validationErrors.phone}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="employee_id">
                <Form.Label>Employee Id</Form.Label>
                <Form.Control type="text" name="employee_id" placeholder="Enter Employee Id" value={formData.employee_id} onChange={handleInputChange} />
                {validationErrors.employee_id && <Form.Text className="text-danger">{validationErrors.employee_id}</Form.Text>}
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="image">
                <Form.Label>image</Form.Label>
                <Form.Control type="file" name="image" value={formData.image} onChange={handleInputChange} />
                {validationErrors.image && <Form.Text className="text-danger">{validationErrors.image}</Form.Text>}
              </Form.Group> */}
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
                <i className="mdi mdi-plus-circle"></i> Add Staff
              </Button>
              <h4 className="header-title mb-4">Manage Staff</h4>
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

const Students = () => {
  const dispatch = useDispatch();

  const { state, loading, error } = useSelector((state: RootState) => ({
    state: state.AdminStaff.adminStaff.data,
    loading: state?.AdminStaff.loading,
    error: state?.AdminStaff.error,
  }));

  useEffect(() => {
    dispatch(getAdminStaff());
  }, []);

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Student Management", path: "/users/students" },
          {
            label: "Students",
            path: "/users/students",
            active: true,
          },
        ]}
        title={"Student Management"}
      />
      <Row>
        <Col>
          <BasicInputElements state={state} loading={loading} error={error} />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default Students;
