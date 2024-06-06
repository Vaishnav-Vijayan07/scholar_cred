import React, { useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getConsultants } from "../../redux/actions";
import { RootState } from "../../redux/store";
import PageTitle from "../../components/PageTitle";

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
import axios from "axios";
import { showSuccessAlert } from "../../constants/alerts";

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
  {
    text: "50",
    value: 50,
  },
];

// import { CustomCropper } from "./CustomCropper";

const BasicInputElements = withSwal((props: any) => {
  const dispatch = useDispatch();
  const { swal, loading, state, error, success, initialLoading, user } = props;
  const [modal, setModal] = useState<boolean>(false);
  const [commision, setCommision] = useState("");
  const [errMsg, setErrorMsg] = useState("");

  const toggle = () => {
    setErrorMsg("");
    setCommision("");
    setModal(!modal);
  };
  const handleInputChange = (e: any) => {
    setErrorMsg("");
    const { value } = e.target;

    setCommision(value);
  };

  const handleSave = async () => {
    if (commision === "") {
      setErrorMsg("Please enter commision");
      return;
    }
    if (parseInt(commision) < 0) {
      setErrorMsg("Entered commision is not valid");
      return;
    }
    try {
      const { data } = await axios.patch("/forex/update-commision", {
        commision,
        user,
      });
      toggle();
      showSuccessAlert(data.message);
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  //Input data

  //   const columns = [
  //     {
  //       Header: "Sl No",
  //       accessor: "",
  //       Cell: ({ row }: any) => <>{row.index + 1}</>, // Use row.index to get the row number
  //       sort: false,
  //     },
  //     {
  //       Header: "Image",
  //       accessor: "",
  //       Cell: ({ row }: any) => (
  //         <div>
  //           {row.original.image_url && (
  //             <img
  //               src={`${process.env.REACT_APP_BACKEND_URL}${row.original.image_url}`}
  //               alt="comapny logo"
  //               width="50"
  //             />
  //           )}
  //         </div>
  //       ),
  //     },
  //     {
  //       Header: "Alt Image",
  //       accessor: "",
  //       Cell: ({ row }: any) => (
  //         <div>
  //           {row.original?.second_image_url && (
  //             <img
  //               src={`${process.env.REACT_APP_BACKEND_URL}${row.original.second_image_url}`}
  //               alt="comapny logo"
  //               width="50"
  //             />
  //           )}
  //         </div>
  //       ),
  //     },
  //     {
  //       Header: "Company Name",
  //       accessor: "company_name",
  //       sort: true,
  //     },
  //     {
  //       Header: "Business Address",
  //       accessor: "business_address",
  //       sort: false,
  //     },
  //     {
  //       Header: "Phone",
  //       accessor: "phone",
  //       sort: false,
  //       Cell: ({ row }: any) => (
  //         <ul className="list-unstyled">
  //           <li>{row.original.phone}</li>
  //           <li>{row.original.alternative_phone}</li>
  //         </ul>
  //       ),
  //     },
  //     {
  //       Header: "GST",
  //       accessor: "gst",
  //       sort: false,
  //     },
  //     {
  //       Header: "Location",
  //       accessor: "location",
  //       sort: false,
  //     },
  //     {
  //       Header: "Pin Code",
  //       accessor: "pin_code",
  //       sort: false,
  //     },
  //     {
  //       Header: "Pan No",
  //       accessor: "pan_no",
  //       sort: false,
  //     },
  //     {
  //       Header: "Forex Privilage",
  //       accessor: "",
  //       sort: false,
  //       Cell: ({ row }: any) => (
  //         <p>
  //           {row.original?.isforexenabled ? (
  //             <Badge bg="success">Allowed</Badge>
  //           ) : (
  //             <Badge bg="danger">Not allowed</Badge>
  //           )}
  //         </p>
  //       ),
  //     },
  //     // {
  //     //   Header: "Actions",
  //     //   accessor: "",
  //     //   sort: false,
  //     //   Cell: ({ row }: any) => (
  //     //     <div className="d-flex justify-content-center align-items-center gap-2">
  //     //       {/* Edit Icon */}
  //     //       <Link to={`/users/consultant/${row.original.id}`}>
  //     //         <FeatherIcons
  //     //           icon="eye"
  //     //           size="15"
  //     //           className="cursor-pointer text-secondary"
  //     //         />
  //     //       </Link>
  //     //       <FeatherIcons
  //     //         icon="edit"
  //     //         size="15"
  //     //         className="cursor-pointer text-secondary"
  //     //         onClick={() => {
  //     //           handleUpdate(row.original);
  //     //           openModalWithClass("modal-right");
  //     //         }}
  //     //       />

  //     //       {/* Delete Icon */}
  //     //       <FeatherIcons
  //     //         icon="trash-2"
  //     //         size="15"
  //     //         className="cursor-pointer text-secondary"
  //     //         onClick={() => handleDelete(row.original.id)}
  //     //       />
  //     //     </div>
  //     //   ),
  //     // },
  //   ];

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
          <Modal show={modal} onHide={toggle} centered>
            <Modal.Body>
              <Form>
                <Row>
                  <Form.Group className="mb-3" controlId="company_name">
                    <Form.Label>Add commision amount</Form.Label>
                    <Form.Control
                      type="number"
                      name="commision"
                      placeholder="Enter your amount eg: 590.23"
                      value={commision}
                      onInput={handleInputChange}
                    />
                    {errMsg && (
                      <Form.Text className="text-danger">{errMsg}</Form.Text>
                    )}
                  </Form.Group>
                </Row>

                <div className="text-end">
                  <Button
                    variant="danger"
                    id="button-addon2"
                    // disabled={loading}
                    className="mt-1 waves-effect waves-light me-2"
                    onClick={() => toggle()}
                  >
                    Close
                  </Button>

                  <Button
                    type="button"
                    variant="success"
                    id="button-addon2"
                    className="waves-effect waves-light mt-1"
                    disabled={errMsg !== ""}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
          <Col className="p-0 form__card">
            <Card className="bg-white">
              <Card.Body>
                <div className="d-flex float-end gap-2">
                  <Button
                    className="btn-sm btn-blue waves-effect waves-light"
                    onClick={() => toggle()}
                  >
                    <i className="mdi mdi-plus-circle"></i> Set Commision
                  </Button>
                </div>
                {/* <h4 className="header-title mb-4">Manage Consultant</h4> */}
                <Table
                  columns={[]}
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

const ForexData = () => {
  const dispatch = useDispatch();

  const { state, loading, error, success, initialLoading, user } = useSelector(
    (state: RootState) => ({
      state: state?.ConsultantReducer.consultant.data,
      loading: state?.ConsultantReducer.loading,
      error: state?.ConsultantReducer.error,
      success: state?.ConsultantReducer.success,
      initialLoading: state?.ConsultantReducer.initialLoading,
      user: state?.Auth?.user,
    })
  );

  useEffect(() => {
    dispatch(getConsultants());
  }, []);

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Forex", path: "/users/consultant" },
          {
            label: "Forex Data",
            path: "/users/consultant",
            active: true,
          },
        ]}
        title={"Forex Data"}
      />
      <Row>
        <Col>
          <BasicInputElements
            state={state}
            loading={loading}
            error={error}
            success={success}
            initialLoading={initialLoading}
            user={user}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ForexData;
