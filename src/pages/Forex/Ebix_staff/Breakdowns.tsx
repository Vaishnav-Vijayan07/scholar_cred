import { Col, Form, Row } from "react-bootstrap";

const Breakdowns = ({ state }: any) => {
  console.log(state);

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
        </Row>

        <h5 className="mb-3 text-uppercase bg-light p-2 mt-3">Amounts</h5>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Forex Amount</Form.Label>
              <Form.Control
                type="text"
                value={state?.declaration_amount || ""}
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
                value={state?.sub_total || ""}
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
                value={state?.amount_payable || ""}
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
