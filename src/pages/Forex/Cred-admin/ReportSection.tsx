import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import PageTitle from "../../../components/PageTitle";

import { Row, Col, Card, Form, Button, Modal, Spinner } from "react-bootstrap";
import Table from "../../../components/Table";
import { withSwal } from "react-sweetalert2";
import FeatherIcons from "feather-icons-react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  getConsultantsForex,
  getReports,
} from "../../../redux/Forex/Report/actions";
import { months, years } from "./data";
import commisionReportExcelDownload from "../../../helpers/api/excelDwonloadCommisionReport";
import { showWarningAlert } from "../../../constants/alerts";

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

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
const animatedComponents = makeAnimated();

const BasicInputElements = withSwal((props: any) => {
  const { state, initialLoading, year, month } = props;
  const [modal, setModal] = useState(false);

  const [formData, setFormData] = useState({
    consultant_commision: "",
    created_at: "",
    company_name: "",
    company_mail: "",
    company_phone: "",
    company_markup_amount: "",
    status: "",
    custorderno: "",
    ebixorderno: "",
    declaration_amount: "",
    exchange_rate: "",
    sub_total: "",
    amount_payable: "",
    gst_charge: "",
    tcs_charge: "",
    service_charge: "",
    admin_charge: "",
    nostro_charge: "",
    consultant_charge: "",
    commission_added_rate: "",
    university_name: "",
    account_number: "",
    swift_code: "",
    bank_address: "",
    branch_name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    purpose: "",
    source: "",
    remitter: "",
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
        Header: "Consultant Email",
        accessor: "company_mail",
      },
      {
        Header: "Consultant Contact",
        accessor: "company_phone",
      },
      {
        Header: "Payment To",
        accessor: "university_name",
      },
      {
        Header: "Date",
        accessor: "date",
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

  const handleDownload = () => {
    if (state.length === 0) {
      showWarningAlert("There is no data to download");
      return;
    }
    commisionReportExcelDownload(state, year, month);
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
      <Row className="justify-content-between px-2">
        <Modal show={modal} size="lg" centered onHide={toggle}>
          <Modal.Header className="bg-light" closeButton>
            <Modal.Title className="m-0">Transaction details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="transaction_id">
                  <Form.Label>Purpose</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.purpose || ""}
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
                  <Form.Label>Source</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.source || ""}
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
                  <Form.Label>Remitter</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.remitter || ""}
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
                  <Form.Label>Payment status</Form.Label>
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
              <Col md={4}>
                <Form.Group className="mb-3" controlId="transaction_id">
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
              <Col md={4}>
                <Form.Group className="mb-3" controlId="transaction_id">
                  <Form.Label>Customer OrderNo.</Form.Label>
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
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="transaction_id">
                  <Form.Label>Bank Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.bank_address || ""}
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
                <Form.Group className="mb-3" controlId="transaction_id">
                  <Form.Label>Bank Branch</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.branch_name || ""}
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
                <Form.Group className="mb-3" controlId="transaction_id">
                  <Form.Label>Swift Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.swift_code || ""}
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
            <Row className="mb-1 mt-1">
              <h4>Charges</h4>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="transaction_id">
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
              <Col md={4}>
                <Form.Group className="mb-3" controlId="transaction_id">
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
                <Form.Group className="mb-3" controlId="transaction_id">
                  <Form.Label>GST</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.gst_charge || ""}
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
                  <Form.Label>TCS</Form.Label>
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
            </Row>
            <Row className="mb-1 mt-1">
              <h4>Amounts</h4>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="transaction_id">
                  <Form.Label>Forex Amount</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.declaration_amount || ""}
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
                <Form.Group className="mb-3" controlId="transaction_id">
                  <Form.Label>Buy Rate</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.exchange_rate || ""}
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
                <Form.Group className="mb-3" controlId="transaction_id">
                  <Form.Label>Buy Rate (Incl Commissions)</Form.Label>
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
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="transaction_id">
                  <Form.Label>Sub Total</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.sub_total || ""}
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
                <Form.Group className="mb-3" controlId="transaction_id">
                  <Form.Label>Amount Payable</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.amount_payable || ""}
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
            <Row className="mb-1 mt-1">
              <h4>Commision</h4>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="transaction_id">
                  <Form.Label>Consultant Markup amount</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.company_markup_amount || ""}
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
                <Form.Group className="mb-3" controlId="transaction_id">
                  <Form.Label>Commision Amount</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData?.consultant_commision || ""}
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
                <Button className="btn btn-dark " onClick={handleDownload}>
                  <i className="mdi mdi-download"></i> Excel Export
                </Button>
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

const ReportSection = () => {
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [consultant, setConsultant] = useState([]);
  const [consultantIds, setConsultantIds] = useState([]);
  const dispatch = useDispatch();

  const { state, consultants, error, initialLoading } = useSelector(
    (state: RootState) => ({
      state: state?.ForexReport.reports,
      consultants: state?.ForexReport.consultants,
      error: state?.ForexReport.error,
      initialLoading: state?.ForexReport.initialLoading,
    })
  );

  const handleFilter = (e: any) => {
    const { name, value } = e.target;

    if (name == "month") {
      setMonth(parseInt(value));
    }

    if (name == "year") {
      setYear(parseInt(value));
    }
  };

  const handleStatusChange = (items: any) => {
    const selectedIds = items.map((item: any) => item.value);
    setConsultantIds(selectedIds);
    setConsultant(items);
  };

  const applyFilters = () => {
    dispatch(getReports(year, month, consultantIds));
  };

  const handleReset = () => {
    setConsultantIds([]);
    setConsultant([]);
    setYear(currentYear);
    setMonth(currentMonth);
    dispatch(getReports(currentYear, currentMonth, []));
  };

  useEffect(() => {
    dispatch(getReports(currentYear, currentMonth, []));
    dispatch(getConsultantsForex());
  }, []);

  if (initialLoading) {
    return (
      <Spinner
        animation="border"
        style={{ position: "absolute", top: "50%", left: "50%" }}
      />
    );
  }

  if (error) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Forex", path: "" },
          {
            label: "Reports",
            path: "",
            active: true,
          },
        ]}
        title={"Commisions Reports"}
      />
      <Row className="mb-2">
        <Col md={9} className="d-flex gap-3">
          <Col md={2}>
            <Form.Group controlId="courseId">
              <Form.Label>Choose year</Form.Label>
              <Form.Select
                style={{ borderColor: "#000000" }}
                name="year"
                placeholder="Choose a filter"
                value={year}
                onChange={handleFilter}
              >
                <option value="0">All</option>
                {years.map((month: any) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group controlId="courseId">
              <Form.Label>Choose month</Form.Label>
              <Form.Select
                style={{ borderColor: "#000000" }}
                name="month"
                placeholder="Choose a filter"
                value={month}
                onChange={handleFilter}
              >
                <option value="0">All</option>
                {months.map((month: any) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={5}>
            <Form.Label>Choose consultants</Form.Label>
            <Select
              isMulti
              components={animatedComponents}
              name="colors"
              options={consultants?.map((consultant: any) => ({
                label: consultant?.label,
                value: consultant?.value,
              }))}
              placeholder="Consultants"
              value={consultant}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(selectedValues) => handleStatusChange(selectedValues)}
            />
          </Col>
        </Col>
        <Col
          md={3}
          className="d-flex gap-2 justify-content-end align-items-center"
        >
          <div>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>
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
      </Row>
      <Row>
        <Col>
          <BasicInputElements
            state={state}
            initialLoading={initialLoading}
            month={month}
            year={year}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ReportSection;
