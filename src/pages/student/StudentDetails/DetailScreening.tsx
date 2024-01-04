import { Col, Form, Row } from "react-bootstrap";
import { FormInput } from "../../../components";
import { Control, FieldErrors } from "react-hook-form";

interface FormInputProps {
  register: any;
  errors: FieldErrors;
  control: Control<any>;
}
// Timeline
const TimeLine = ({ register, errors, control }: FormInputProps) => {
  return (
    <>
      <h5 className="mb-4 text-uppercase">
        <i className="mdi mdi-account-circle me-1"></i> Collateral screening
      </h5>
      <Row>
        <Col md={4}>
          <Form.Label>Type Of Property</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">House with land</option>
            <option value="2">House with housing loan</option>
            <option value="3">FD</option>
            <option value="4">Gold</option>
            <option value="5">Land without house</option>
            <option value="6">Government Bonds</option>
          </Form.Select>
        </Col>

        {/* 

        <Col md={4}>
          <FormInput
            label="Whatsapp Number"
            type="number"
            name="phone"
            placeholder="Enter phone number"
            containerClass={"mb-3"}
            register={register}
            key="phone"
            errors={errors}
            control={control}
          />
        </Col> */}
      </Row>

      <Row className="mt-3">
        <Form.Label>
          <b>House with Land</b>
        </Form.Label>
        <div className="mb-2">
          <Form.Check className="mb-1" type={"radio"} label={`Rc House`} />
          <Form.Check className="mb-1" type={"radio"} label={`4 Wheeler entry`} />
          <Form.Check className="mb-1" type={"radio"} label={`Nilam/Purayidam`} />
          <Form.Check className="mb-1" type={"radio"} label={`Bought within last 3 years ?`} />
          <Form.Check className="mb-1" type={"radio"} label={`Existing housing loan ?`} />
        </div>
        <Col md={4}>
          <FormInput
            label="Specify the name of the bank"
            type="text"
            name="bank_name"
            placeholder="Enter Bank Name"
            containerClass={"mb-3"}
            register={register}
            key="bank_name"
            errors={errors}
            control={control}
          />
        </Col>
      </Row>

      <Row className="">
        <Form.Label>
          <b>Land Only</b>
        </Form.Label>
        <Col md={4}>
          <FormInput
            label="Total Land Area (in Cents)"
            type="number"
            name="land_area"
            placeholder="Enter total land area"
            containerClass={"mb-3"}
            register={register}
            key="land_area"
            errors={errors}
            control={control}
          />
        </Col>
        <div className="mb-2">
          <Form.Check className="mb-1" type={"radio"} label={`Boundary wall`} />
          <Form.Check className="mb-1" type={"radio"} label={`4 Wheeler entry ?`} />
          <Form.Check className="mb-1" type={"radio"} label={`Any agricultural activities ?`} />
          <Form.Check className="mb-1" type={"radio"} label={`Bought within last 3 years ?`} />
          <Form.Check className="mb-1" type={"radio"} label={`Value of the property ?`} />
        </div>

        <Col md={4}>
          <Form.Label>Property Registration Type</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">Dry Land</option>
            <option value="2">Wet Land</option>
            <option value="3">Purayidam</option>
          </Form.Select>
        </Col>
      </Row>

      <h5 className="mb-3 text-uppercase bg-light p-2 mt-3">
        <i className="mdi mdi-office-building me-1"></i> Academic Screening
      </h5>

      <Row>
        <Col md={4}>
          <Form.Label>Scored below 60% in 10th/12th/UG ?</Form.Label>
          <div className="d-flex gap-2">
            <Form.Check className="mb-1" type={"radio"} label={`Yes`} />
            <Form.Check className="mb-1" type={"radio"} label={`No`} />
          </div>
        </Col>

        <Col md={4}>
          <Form.Label>University Rank</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">Not Yet Decided</option>
            <option value="2">Started Applying</option>
            <option value="3">Recieved Offer Letter</option>
          </Form.Select>
        </Col>

        <Col md={4}>
          <Form.Label>Type of program</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">PG</option>
            <option value="2">UG</option>
            <option value="3">Diploma</option>
          </Form.Select>
        </Col>
      </Row>

      <h5 className="mb-3 text-uppercase bg-light p-2 mt-3">
        <i className="mdi mdi-office-building me-1"></i> Credit Screening
      </h5>

      <Row>
        <Col md={4}>
          <Form.Label>Collateral Availability</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">Father</option>
            <option value="2">Started Applying</option>
            <option value="3">Recieved Offer Letter</option>
          </Form.Select>
        </Col>
      </Row>
    </>
  );
};

export default TimeLine;
