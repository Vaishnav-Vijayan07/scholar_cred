import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Control, FieldErrors } from "react-hook-form";
import { FormInput } from "../../../components";

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
  preliminaryLoading: boolean;
}

const PreliminaryScreening = ({ register, errors, control, preliminaryDetails, preliminaryLoading }: FormInputProps) => {
  const [applicationStatus, setApplicationStatus] = useState("");
  const [programType, setProgramType] = useState("");
  const [primaryApplicant, setPrimaryApplicant] = useState("");
  const [typeOfProfossion, setTypeOfProfossion] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [collatralItem, setCollatralItem] = useState("");

  useEffect(() => {
    setApplicationStatus(preliminaryDetails?.application_status);
    setProgramType(preliminaryDetails?.program_type);
    setPrimaryApplicant(preliminaryDetails?.primary_applicant);
    setTypeOfProfossion(preliminaryDetails?.type_of_profossion);
    setSalaryRange(preliminaryDetails?.salary_range);
    setCollatralItem(preliminaryDetails?.collatral_item);
  }, [preliminaryDetails]);

  return (
    <>
      <>
        <h5 className="mb-4 text-uppercase">
          <i className="mdi mdi-account-circle me-1"></i> Personal Info
        </h5>
        <Row>
          <Col xl={6} xxl={4}>
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

          <Col xl={6} xxl={4}>
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

          <Col xl={6} xxl={4}>
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

          {/* </Row>
        <Row> */}
          <Col xl={6} xxl={4}>
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

          <Col xl={6} xxl={4}>
            <Form.Label>Application Status</Form.Label>
            <Form.Select className="mb-3" aria-label="Default select example" value={applicationStatus} onChange={(e: any) => setApplicationStatus(e.target.value)}>
              <option value="" disabled>Open this select menu</option>
              <option value="Not Yet Decided">Not Yet Decided</option>
              <option value="Started Applying">Started Applying</option>
              <option value="Received Offer Letter">Recieved Offer Letter</option>
            </Form.Select>
          </Col>

          <Col xl={6} xxl={4}>
            <Form.Label>Program Type</Form.Label>
            <Form.Select className="mb-3" aria-label="Default select example" value={programType} onChange={(e: any) => setProgramType(e.target.value)}>
              <option value="" disabled>Open this select menu</option>
              <option value="PG">PG</option>
              <option value="UG">UG</option>
              <option value="PG Diploma">PG Diploma</option>
              <option value="UG Diploma">UG Diploma</option>
              <option value="Certificate Programs">Certificate Programs</option>
            </Form.Select>
          </Col>
          {/* </Row>
            <Row> */}
          <Col xl={6} xxl={4}>
            <FormInput
              label="University Details"
              type="text"
              name="university_details"
              placeholder="Enter phone number"
              containerClass={"mb-3"}
              register={register}
              key="university_details"
              errors={errors}
              control={control}
              defaultValue={preliminaryDetails?.university_details}
            />
          </Col>
        </Row>

        <h5 className="mb-3 text-uppercase bg-light p-2 mt-3">
          <i className="mdi mdi-office-building me-1"></i> Co-Applicant Details
        </h5>

        <Row>
          <Col xl={6} xxl={4}>
            <Form.Label>Primary Co-Applicant Details</Form.Label>
            <Form.Select className="mb-3" aria-label="Default select example" value={primaryApplicant} onChange={(e: any) => setPrimaryApplicant(e.target.value)}>
              <option value="" disabled>Open this select menu</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Siblings (brother/sister)">Siblings (brother/sister)</option>
              <option value="Husband/Wife">Husband/Wife</option>
              <option value="In-laws (Father/Mother/Brother/Sister in law)">In-laws (Father/Mother/Brother/Sister in law)</option>
              <option value="No earning co-applicant">No earning co-applicant</option>
            </Form.Select>
          </Col>

          <Col xl={6} xxl={4}>
            <Form.Label>Type Of Profession</Form.Label>
            <Form.Select className="mb-3" aria-label="Default select example" value={typeOfProfossion} onChange={(e: any) => setTypeOfProfossion(e.target.value)}>
              <option value="" disabled>Open this select menu</option>
              <option value="Salaried">Salaried</option>
              <option value="Self Employed">Self Employed</option>
              <option value="Business">Business</option>
              <option value="Retired with Pension">Retired with Pension</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Not Salaried">Not Salaried</option>
            </Form.Select>
          </Col>

          <Col xl={6} xxl={4}>
            <Form.Label>Salary Range</Form.Label>
            <Form.Select className="mb-3" aria-label="Default select example" value={salaryRange} onChange={(e: any) => setSalaryRange(e.target.value)}>
              <option value="" disabled>Open this select menu</option>
              <option value="<30000/month">&lt;30000/month</option>
              <option value="30-40000/month">30-40000/month</option>
              <option value=">40000/month">&gt;40000/month</option>
            </Form.Select>
          </Col>

          <Col xl={6} xxl={4}>
            <Form.Label>Salary Range</Form.Label>
            <Form.Select className="mb-3" aria-label="Default select example" value={salaryRange} onChange={(e: any) => setSalaryRange(e.target.value)}>
              <option value="" disabled>Open this select menu</option>
              <option value="<30000/month">&lt;30000/month</option>
              <option value="30-40000/month">30-40000/month</option>
              <option value=">40000/month">&gt;40000/month</option>
            </Form.Select>
          </Col>
        </Row>

        <h5 className="mb-3 text-uppercase bg-light p-2 mt-3">
          <i className="mdi mdi-office-building me-1"></i> Collateral Info
        </h5>

        <Row>
          <Col xl={6} xxl={4}>
            <Form.Label>Collateral Availability</Form.Label>
            <Form.Select aria-label="Default select example" value={collatralItem} onChange={(e: any) => setCollatralItem(e.target.value)}>
              <option value="" disabled>Open this select menu</option>
              <option value="House">House</option>
              <option value="House With Housing Loan">House With Housing Loan</option>
              <option value="FD">FD</option>
              <option value="Gold">Gold</option>
              <option value="Land Without House">Land Without House</option>
              <option value="Government Bonds">Government Bonds</option>
              <option value="No collateral security available">No collateral security available</option>
            </Form.Select>
          </Col>
        </Row>
      </>
    </>
  );
};

export default PreliminaryScreening;
