import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import PageTitle from "../../../components/PageTitle";

import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Spinner,
  Badge,
} from "react-bootstrap";
import Table from "../../../components/Table";
import { withSwal } from "react-sweetalert2";
import FeatherIcons from "feather-icons-react";
import { getForexData } from "../../../redux/Forex/actions";
import { formatCurrency, getInrType } from "../../../helpers/currencyConverter";
import HyperDatepicker from "../../../components/Datepicker";

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

const BasicInputElements = withSwal((props: any) => {
  const { state, initialLoading } = props;
  const [modal, setModal] = useState(false);

  const [formData, setFormData] = useState({
    status: "",
    orderstatus: "",
    currency: "",
    custorderno: "",
    ebixorderno: "",
    reference_id: "",
    transaction_id: "",
    purpose_name: "",
    source_name: "",
    remitter_name: "",
    id: "",
    forex_id: "",
    service_charge: "",
    gst_charge: "",
    nostro_charge: "",
    amount_payable: "",
    tcs_charge: "",
    sub_total: "",
    declaration_amount: "",
    admin_charge: "",
    consultant_charge: "",
    exchange_rate: "",
    api_rate: "",
    commission_added_rate: "",
    first_name: "",
    last_name: "",
    email: "",
    paid_to: "",
    amount: "",
    company_name: "",
  });

  const toggle = useCallback(() => setModal((prev) => !prev), []);
  const handleData = useCallback((data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Sl No",
        accessor: "",
        Cell: ({ row }: any) => <>{row.index + 1}</>,
        sort: false,
      },
      {
        Header: "Student",
        accessor: "student_name",
        Cell: ({ row }: any) => (
          <>{`${row.original.first_name} ${row.original.last_name}`}</>
        ),
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Consultant",
        accessor: "company_name",
      },
      {
        Header: "Payment To",
        accessor: "paid_to",
      },
      {
        Header: "Ebix Order Status",
        accessor: "orderstatus",
      },
      {
        Header: "Payment Status",
        accessor: "status",
        Cell: ({ row }: any) => {
          return (
            <Badge
              bg={(() => {
                switch (row.original.status) {
                  case "success":
                    return "success";
                  case "failed":
                    return "danger";
                  case "pending":
                    return "warning"; // Choose a suitable color for "Pending"
                  default:
                    return "secondary"; // Fallback color if status is unknown
                }
              })()}
            >
              {(() => {
                switch (row.original.status) {
                  case "success":
                    return "Success";
                  case "failed":
                    return "Failed";
                  case "pending":
                    return "Pending";
                  default:
                    return "Unknown"; // Fallback text if status is unknown
                }
              })()}
            </Badge>
          );
        },
      },
      {
        Header: "Date",
        accessor: "payment_created_at",
      },

      {
        Header: "View More",
        accessor: "",
        sort: false,
        Cell: ({ row }: any) => (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <FeatherIcons
              icon="eye"
              size="15"
              className="cursor-pointer text-secondary"
              onClick={() => {
                handleData(row.original);
                toggle();
              }}
            />
          </div>
        ),
      },
    ],
    [handleData, toggle]
  );

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
        <Modal show={modal} size="lg" centered onHide={toggle}>
          <Modal.Header className="bg-light" closeButton>
            <Modal.Title className="m-0">Transaction details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Row className="mt-1 mb-1">
                <h4>Status</h4>
              </Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="transaction_id">
                  <Form.Label>Transaction ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.transaction_id || ""}
                    readOnly
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="reference_id">
                  <Form.Label>Reference ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.reference_id || ""}
                    readOnly
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="reference_id">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.status || ""}
                    readOnly
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="transaction_id">
                  <Form.Label>Order Status</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.orderstatus || ""}
                    readOnly
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="reference_id">
                  <Form.Label>Cust.OrderNo</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.custorderno || ""}
                    readOnly
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="reference_id">
                  <Form.Label>Ebix OrderNo.</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.ebixorderno || ""}
                    readOnly
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="purpose">
                  <Form.Label>Purpose</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.purpose_name || ""}
                    readOnly
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="source">
                  <Form.Label>Source</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.source_name || ""}
                    readOnly
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="remitter">
                  <Form.Label>Remitter</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.remitter_name || ""}
                    readOnly
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Row className="mt-3 mb-1">
                <h4>Charges</h4>
              </Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="transaction_id">
                  <Form.Label>Tcs Charge</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.tcs_charge || ""}
                    readOnly
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="reference_id">
                  <Form.Label>Service Charge</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.service_charge || ""}
                    readOnly
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="reference_id">
                  <Form.Label>Nostro Charge</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.nostro_charge || ""}
                    readOnly
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {formData?.consultant_charge && (
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="reference_id">
                    <Form.Label>Consultant Makeup Amount</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData?.consultant_charge || ""}
                      readOnly
                      style={{
                        border: "none",
                        borderBottom: "1px solid #ced4da",
                        borderRadius: "0",
                        backgroundColor: "#f8f9fa",
                      }}
                    />
                  </Form.Group>
                </Col>
              )}
              {formData?.admin_charge && (
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="reference_id">
                    <Form.Label>Admin Makeup Amount</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData?.admin_charge || ""}
                      readOnly
                      style={{
                        border: "none",
                        borderBottom: "1px solid #ced4da",
                        borderRadius: "0",
                        backgroundColor: "#f8f9fa",
                      }}
                    />
                  </Form.Group>
                </Col>
              )}
            </Row>
            <Row>
              <Row className="mt-3 mb-1">
                <h4>Amounts</h4>
              </Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="transaction_id">
                  <Form.Label>Forex Amount</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      formatCurrency(formData?.amount, formData?.currency) || ""
                    }
                    readOnly
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="reference_id">
                  <Form.Label>Total Amount</Form.Label>
                  <Form.Control
                    type="text"
                    value={getInrType(formData?.sub_total) || ""}
                    readOnly
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="reference_id">
                  <Form.Label>Amount Paid</Form.Label>
                  <Form.Control
                    type="text"
                    value={getInrType(formData?.amount_payable) || ""}
                    readOnly
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="reference_id">
                  <Form.Label>Buy Rate</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.commission_added_rate || ""}
                    readOnly
                    style={{
                      border: "none",
                      borderBottom: "1px solid #ced4da",
                      borderRadius: "0",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row></Row>
            <div className="text-end">
              <Button
                variant="danger"
                id="button-addon2"
                className="mt-1 waves-effect waves-light me-2"
                onClick={toggle}
              >
                Close
              </Button>
            </div>
          </Modal.Body>
        </Modal>
        <Col className="p-0 form__card">
          <Card className="bg-white">
            <Card.Body>
              <div className="d-flex float-end gap-2">
                {/* Additional buttons or actions */}
              </div>
              <Table
                columns={columns}
                data={state || []}
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

const TransactionsAdmin = () => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState("all");

  const [dates, setDates] = useState<any>({
    from: new Date(),
    to: new Date(),
  });

  const [formattedDates, setFormattedDates] = useState<any>({
    from: null,
    to: new Date().toISOString().split("T")[0],
  });

  const handleDateChange = (date: any, type: string) => {
    setDates((prev: any) => ({
      ...prev,
      [type]: date,
    }));

    setFormattedDates((prev: any) => ({
      ...prev,
      [type]: date.toISOString().split("T")[0],
    }));
  };

  const handleStatusChange = (e: any) => {
    const { value } = e.target;
    setStatus(value);
  };

  const { state, loading, error, success, initialLoading, user } = useSelector(
    (state: RootState) => ({
      state: state?.Forex.forexData,
      loading: state?.Forex.loading,
      error: state?.Forex.error,
      success: state?.Forex.success,
      initialLoading: state?.Forex.initialLoading,
      user: state?.Auth?.user,
    })
  );

  useEffect(() => {
    dispatch(getForexData(null, new Date().toISOString().split("T")[0], "all"));
  }, []);

  const applyFilters = () => {
    dispatch(getForexData(formattedDates?.from, formattedDates.to, status));
  };

  const handleReset = () => {
    setStatus("all");
    setDates({ from: new Date(), to: new Date() });
    dispatch(getForexData(null, new Date().toISOString().split("T")[0], "all"));
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

      <Row className="mb-3">
        <Col sm={9} className="d-flex gap-2">
          <Col sm={3}>
            <Form.Group controlId="fromDate">
              <Form.Label>From</Form.Label>
              <HyperDatepicker
                hideAddon={true}
                dateFormat="yyyy-MM-dd"
                value={dates.from}
                onChange={(date) => handleDateChange(date, "from")}
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group controlId="toDate">
              <Form.Label>To</Form.Label>
              <HyperDatepicker
                hideAddon={true}
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                value={dates.to}
                onChange={(date) => handleDateChange(date, "to")}
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group controlId="paymentStatus">
              <Form.Label>Payment Status</Form.Label>
              <Form.Control
                as="select"
                value={status} // Assume `status` is part of your component state
                onChange={handleStatusChange}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Col>
        <Col sm={3} className="d-flex justify-content-end align-items-center">
          <Col sm={3} className="d-flex align-items-end">
            <div>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={applyFilters}
              >
                Apply
              </button>
            </div>
          </Col>
          <Col sm={3} className="d-flex align-items-end">
            <div>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </Col>
        </Col>
      </Row>

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

export default TransactionsAdmin;
