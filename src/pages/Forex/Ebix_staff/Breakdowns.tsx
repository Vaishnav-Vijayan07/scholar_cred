import { Col, Form, Row } from "react-bootstrap";
import { formatCurrency, getInrType } from "../../../helpers/currencyConverter";

const Breakdowns = ({ state }: any) => {
  return (
    <>
      <>
        <h5 className="mb-4 text-uppercase bg-light p-2">Status</h5>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                value={state?.status || ""}
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
            <Form.Group className="mb-3">
              <Form.Label>Order Status</Form.Label>
              <Form.Control
                type="text"
                value={state?.orderstatus || ""}
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
            <Form.Group className="mb-3">
              <Form.Label>Transaction ID</Form.Label>
              <Form.Control
                type="text"
                value={state?.transaction_id || ""}
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
            <Form.Group className="mb-3">
              <Form.Label>Reference ID</Form.Label>
              <Form.Control
                type="text"
                value={state?.reference_id || ""}
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
            <Form.Group className="mb-3">
              <Form.Label>Ebix OrderNo.</Form.Label>
              <Form.Control
                type="text"
                value={state?.ebixorderno || ""}
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
            <Form.Group className="mb-3">
              <Form.Label>Ebix CustNo.</Form.Label>
              <Form.Control
                type="text"
                value={state?.custorderno || ""}
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
            <Form.Group className="mb-3">
              <Form.Label>Purpose</Form.Label>
              <Form.Control
                type="text"
                value={state?.purpose_name || ""}
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
            <Form.Group className="mb-3">
              <Form.Label>Source</Form.Label>
              <Form.Control
                type="text"
                value={state?.source_name || ""}
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
            <Form.Group className="mb-3">
              <Form.Label>Remitter</Form.Label>
              <Form.Control
                type="text"
                value={state?.remitter_name || ""}
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

        <h5 className="mb-3 text-uppercase bg-light p-2 mt-3">Charges</h5>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Nostro Charge</Form.Label>
              <Form.Control
                type="text"
                value={state?.nostro_charge || ""}
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
            <Form.Group className="mb-3">
              <Form.Label>GST Charge</Form.Label>
              <Form.Control
                type="text"
                value={state?.gst_charge || ""}
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
            <Form.Group className="mb-3">
              <Form.Label>TCS Charge</Form.Label>
              <Form.Control
                type="text"
                value={state?.tcs_charge || ""}
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
            <Form.Group className="mb-3">
              <Form.Label>Service Charge</Form.Label>
              <Form.Control
                type="text"
                value={state?.service_charge || ""}
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
            <Form.Group className="mb-3">
              <Form.Label>Admin Commision</Form.Label>
              <Form.Control
                type="text"
                value={state?.admin_charge || ""}
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
          {state?.consultant_id && (
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Consultant Commision</Form.Label>
                <Form.Control
                  type="text"
                  value={state?.consultant_charge || ""}
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
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Commision Added Buy Rate</Form.Label>
              <Form.Control
                type="text"
                value={state?.commission_added_rate || ""}
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

        <h5 className="mb-3 text-uppercase bg-light p-2 mt-3">Amounts</h5>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Forex Amount</Form.Label>
              <Form.Control
                type="text"
                value={
                  formatCurrency(state?.declaration_amount, state?.currency) ||
                  ""
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
            <Form.Group className="mb-3">
              <Form.Label>Buy Rate</Form.Label>
              <Form.Control
                type="text"
                value={state?.exchange_rate || ""}
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
            <Form.Group className="mb-3">
              <Form.Label>Sub Total</Form.Label>
              <Form.Control
                type="text"
                value={getInrType(state?.sub_total) || ""}
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
            <Form.Group className="mb-3">
              <Form.Label>Total Amount (charges included)</Form.Label>
              <Form.Control
                type="text"
                value={getInrType(state?.amount_payable) || ""}
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
            <Form.Group className="mb-3">
              <Form.Label>Admin Commision Amount</Form.Label>
              <Form.Control
                type="text"
                value={getInrType(state?.admin_commision) || ""}
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
          {state?.consultant_id && (
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Consultant Commision Amount</Form.Label>
                <Form.Control
                  type="text"
                  value={getInrType(state?.consultant_commision) || ""}
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

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Total Commision</Form.Label>
              <Form.Control
                type="text"
                value={getInrType(state?.total_commision) || ""}
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
      </>
    </>
  );
};

export default Breakdowns;
