import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap"; // Assuming you're using React Bootstrap
import Cards from "./Cards";
import { getItemProperties } from "../../Tickets/List/data";
import { useDispatch, useSelector } from "react-redux";
import { getSettlements } from "../../../redux/Forex/actions";
import { RootState } from "../../../redux/store";
import ConsultantCommsions from "./ConsultantCommsions";
import { months, years } from "./data";

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const Summary = () => {
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const dispatch = useDispatch();

  const { totalCounts, commision_total, consultantCommission, initialLoading } =
    useSelector((state: RootState) => ({
      totalCounts: state?.Forex.report_counts,
      commision_total: state?.Forex.commision_total,
      consultantCommission: state?.Forex.consultant_commisions,
      loading: state?.Forex.loading,
      error: state?.Forex.error,
      success: state?.Forex.success,
      initialLoading: state?.Forex.initialLoading,
    }));

  const handleFilter = (e: any) => {
    const { name, value } = e.target;

    if (name == "month") {
      setMonth(parseInt(value));
      dispatch(getSettlements(year, value));
      return;
    }

    if (name == "year") {
      setYear(parseInt(value));
      dispatch(getSettlements(value, month));
      return;
    }
  };

  const handleReset = () => {
    setMonth(currentMonth);
    setYear(currentYear);
    dispatch(getSettlements(currentYear, currentMonth));
  };

  useEffect(() => {
    dispatch(getSettlements(currentYear, currentMonth));
  }, []);

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
      <div className="page-title-box">
        <h4 className="page-title">Summary</h4>
      </div>
      <Row>
        {(totalCounts || []).map((state: any) => (
          <Col md={6} xl={3} key={state?.label}>
            <Cards
              icon={getItemProperties(state?.label).icon}
              variant={getItemProperties(state?.label).variant}
              stats={state?.data}
              desc={state?.label}
            />
          </Col>
        ))}
      </Row>
      <Row>
        {(commision_total || []).map((state: any) => (
          <Col md={4} xl={4} key={state?.label}>
            <Cards
              icon={getItemProperties(state?.label).icon}
              variant={getItemProperties(state?.label).variant}
              stats={state?.data}
              desc={state?.label}
            />
          </Col>
        ))}
      </Row>

      <Row>
        <Col sm={3}>
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
        <Col sm={3}>
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
        <Col sm={3} className="d-flex align-items-end">
          <div>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </Col>
      </Row>

      <div className="page-title-box">
        <h4 className="page-title">Consultant wise commisions</h4>
      </div>
      <Row>
        <ConsultantCommsions state={consultantCommission || []} />
      </Row>
    </>
  );
};

export default Summary;
