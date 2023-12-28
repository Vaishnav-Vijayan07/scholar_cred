import React from "react";
import { Col, Form, Row, Table } from "react-bootstrap";
import classNames from "classnames";
import { Control, FieldErrors } from "react-hook-form";
import { FormInput } from "../../../components";
import { Link } from "react-router-dom";

interface AboutProps {
  projectDetails: {
    id: number;
    client: string;
    name: string;
    startDate: string;
    dueDate: string;
    status: string;
  }[];
}

interface SocialInfo {
  label: string;
  icon: string;
  placeholder: string;
}

interface FormInputProps {
  register: any;
  errors: FieldErrors;
  control: Control<any>;
  preliminaryDetails: any;
}

const About = ({ register, errors, control, preliminaryDetails }: FormInputProps) => {
  console.log("preliminaryDetails-->", preliminaryDetails);

  return (
    <>
      <h5 className="mb-4 text-uppercase">
        <i className="mdi mdi-account-circle me-1"></i> Personal Info
      </h5>
      <Row>
        <Col md={4}>
          <FormInput
            label="Full Name"
            type="text"
            name="fullname"
            placeholder="Enter full name"
            containerClass={"mb-3"}
            register={register}
            key="firstname"
            errors={errors}
            control={control}
            defaultValue={preliminaryDetails?.name}
          />
        </Col>
        <Col md={4}>
          <FormInput
            label="Email Id"
            type="email"
            name="email"
            placeholder="Enter email id"
            containerClass={"mb-3"}
            register={register}
            key="email"
            errors={errors}
            control={control}
            defaultValue={preliminaryDetails?.email}
          />
        </Col>
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
            defaultValue={preliminaryDetails?.whatsapp_number}
          />
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormInput
            label="Destination Country"
            type="text"
            name="destination_country"
            placeholder="Enter Destination Country"
            containerClass={"mb-3"}
            register={register}
            key="destination_country"
            errors={errors}
            control={control}
            defaultValue={preliminaryDetails?.destination_country}
          />
        </Col>

        <Col md={4}>
          <Form.Label>Application Status</Form.Label>
          <Form.Select aria-label="Default select example" defaultValue={preliminaryDetails?.application_status}>
            <option>Open this select menu</option>
            <option value="Not Yet Decided">Not Yet Decided</option>
            <option value="Started Applying">Started Applying</option>
            <option value="Recieved Offer Letter">Recieved Offer Letter</option>
          </Form.Select>
        </Col>

        <Col md={4}>
          <Form.Label>Program Type</Form.Label>
          <Form.Select aria-label="Default select example" defaultValue={preliminaryDetails?.program_type}>
            <option>Open this select menu</option>
            <option value="PG">PG</option>
            <option value="UG">UG</option>
            <option value="PG Diploma">PG Diploma</option>
            <option value="UG Diploma">UG Diploma</option>
            <option value="Certificate Programs">Certificate Programs</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Form.Label>University Details</Form.Label>
          <Form.Select aria-label="Default select example" defaultValue={preliminaryDetails?.university_details}>
            <option>Open this select menu</option>
            <option value="1">PG</option>
            <option value="2">UG</option>
            <option value="3">Diploma</option>
          </Form.Select>
        </Col>
      </Row>

      <h5 className="mb-3 text-uppercase bg-light p-2 mt-3">
        <i className="mdi mdi-office-building me-1"></i> Co-Applicant Details
      </h5>

      <Row>
        <Col md={4}>
          <Form.Label>Primary Co-Applicant Details</Form.Label>
          <Form.Select aria-label="Default select example" defaultValue={preliminaryDetails?.primary_applicant}>
            <option>Open this select menu</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Siblings">Siblings</option>
            <option value="Husband/Wife">Husband/Wife</option>
            <option value="In-Laws">In-Laws</option>
            <option value="No earning co-applicant">No earning co-applicant</option>
          </Form.Select>
        </Col>

        <Col md={4}>
          <Form.Label>Type Of Profession</Form.Label>
          <Form.Select aria-label="Default select example" defaultValue={preliminaryDetails?.type_of_profossion}>
            <option>Open this select menu</option>
            <option value="Salaried">Salaried</option>
            <option value="Self Employed">Self Employed</option>
            <option value="Business">Business</option>
            <option value="Retired with Pension">Retired with Pension</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Not Salaried">Not Salaried</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Label>Salary Range</Form.Label>
          <Form.Select aria-label="Default select example" defaultValue={preliminaryDetails?.salary_range}>
            <option>Open this select menu</option>
            <option value="30000/month">&lt;30000/month</option>
            <option value="30-40000/month">30-40000/month</option>
            <option value="40000/month">&gt;40000/month</option>
          </Form.Select>
        </Col>
      </Row>

      <h5 className="mb-3 text-uppercase bg-light p-2 mt-3">
        <i className="mdi mdi-office-building me-1"></i> Collateral Info
      </h5>

      <Row>
        <Col md={4}>
          <Form.Label>Collateral Availability</Form.Label>
          <Form.Select aria-label="Default select example" defaultValue={preliminaryDetails?.collatral_item}>
            <option>Open this select menu</option>
            <option value="House">House</option>
            <option value="House With Housing Loan">House With Housing Loan</option>
            <option value="FD">FD</option>
            <option value="GOLD">GOLD</option>
            <option value="Land Without House">Land Without House</option>
            <option value="Government Bonds">Government Bonds</option>
            <option value="No collateral security available">No collateral security available</option>
          </Form.Select>
        </Col>
      </Row>
    </>
  );
};

export default About;
