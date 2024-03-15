import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Control, FieldErrors } from "react-hook-form";
import { FormInput } from "../../../components";
import { useDispatch } from "react-redux";
import { savePreliminaryDetails } from "../../../redux/actions";

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

interface FormInputProps {
  register: any;
  errors: FieldErrors;
  control: Control<any>;
  preliminaryDetails: any;
  preliminaryLoading: boolean;
  studentId: string;
  getStudentDataById: any;
}

export interface FormDataTypes {
  name: string;
  email: string;
  whatsapp_number: string;
  destination_country: string;
  university_details: string;
}

const StaffInitialState = {
  name: "",
  email: "",
  whatsapp_number: "",
  destination_country: "",
  university_details: "",
};

const PreliminaryScreening = ({ register, errors, control, preliminaryDetails, preliminaryLoading, studentId, getStudentDataById }: FormInputProps) => {
  const [applicationStatus, setApplicationStatus] = useState("");
  const [programType, setProgramType] = useState("");
  const [primaryApplicant, setPrimaryApplicant] = useState("");
  const [typeOfProfossion, setTypeOfProfossion] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [collatralItem, setCollatralItem] = useState("");
  const [formData, setFormData] = useState<FormDataTypes>(StaffInitialState);

  const dispatch = useDispatch();

  console.log("formData", formData);
  console.log("preliminaryDetails===>", preliminaryDetails);

  useEffect(() => {
    setApplicationStatus(preliminaryDetails?.application_status);
    setProgramType(preliminaryDetails?.program_type);
    setPrimaryApplicant(preliminaryDetails?.primary_applicant);
    setTypeOfProfossion(preliminaryDetails?.type_of_profossion);
    setSalaryRange(preliminaryDetails?.salary_range);
    setCollatralItem(preliminaryDetails?.collatral_item);
    setFormData({
      name: preliminaryDetails?.name || "",
      email: preliminaryDetails?.email || "",
      whatsapp_number: preliminaryDetails?.whatsapp_number || "",
      destination_country: preliminaryDetails?.destination_country || "",
      university_details: preliminaryDetails?.university_details || "",
    });
  }, [preliminaryDetails]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    // Limit the length to 10 characters
    if (name == "whatsapp_number") {
      const numericValue = value.replace(/\D/g, "");
      const truncatedValue = numericValue.slice(0, 10);
      setFormData({
        ...formData,
        [name]: truncatedValue,
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    try {
      dispatch(
        savePreliminaryDetails(
          studentId,
          formData.name,
          formData.email,
          formData.whatsapp_number,
          formData.destination_country,
          applicationStatus,
          programType,
          formData.university_details,
          primaryApplicant,
          typeOfProfossion,
          salaryRange,
          collatralItem,
          ""
        )
      );
      getStudentDataById();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <>
        <h5 className="mb-4 text-uppercase">
          <i className="mdi mdi-account-circle me-1"></i> Personal Info
        </h5>
        <Row>
          <Col xl={6} xxl={4}>
            <Form.Label>Full Name</Form.Label>
            <FormInput
              type="text"
              name="name"
              placeholder="Enter full name"
              containerClass={"mb-3"}
              register={register}
              key="firstname"
              errors={errors}
              value={formData.name}
              onChange={handleInputChange}
              control={control}
              defaultValue={preliminaryDetails?.name}
            />
          </Col>

          <Col xl={6} xxl={4}>
            <Form.Label>Email Id</Form.Label>
            <FormInput
              type="email"
              name="email"
              placeholder="Enter email id"
              containerClass={"mb-3"}
              register={register}
              key="email"
              value={formData.email}
              onChange={handleInputChange}
              errors={errors}
              control={control}
            />
          </Col>

          <Col xl={6} xxl={4}>
            <Form.Label>Whatsapp Number</Form.Label>

            <FormInput
              type="number"
              name="whatsapp_number"
              placeholder="Enter phone number"
              containerClass={"mb-3"}
              register={register}
              key="whatsapp_number"
              value={formData.whatsapp_number}
              onChange={handleInputChange}
              errors={errors}
              control={control}
            />
          </Col>

          <Col xl={6} xxl={4}>
            <Form.Label>Destination Country</Form.Label>

            <FormInput
              type="text"
              name="destination_country"
              placeholder="Enter Destination Country"
              containerClass={"mb-3"}
              register={register}
              key="destination_country"
              value={formData.destination_country}
              onChange={handleInputChange}
              errors={errors}
              control={control}
            />
          </Col>

          <Col xl={6} xxl={4}>
            <Form.Label>
              Application Status{" "}
              <span className="badge bg-success float-right" style={{ fontSize: "9px" }}>
                Low
              </span>
            </Form.Label>
            <Form.Select className="mb-3" aria-label="Default select example" value={applicationStatus} onChange={(e: any) => setApplicationStatus(e.target.value)}>
              <option value="" disabled>
                Open this select menu
              </option>
              <option value="Not Yet Decided">Not Yet Decided</option>
              <option value="Started Applying">Started Applying</option>
              <option value="Received Offer Letter">Recieved Offer Letter</option>
            </Form.Select>
          </Col>

          <Col xl={6} xxl={4}>
            <Form.Label>
              Program Type{" "}
              <span className="badge bg-warning float-right" style={{ fontSize: "9px" }}>
                Medium
              </span>
            </Form.Label>
            <Form.Select className="mb-3" aria-label="Default select example" value={programType} onChange={(e: any) => setProgramType(e.target.value)}>
              <option value="" disabled>
                Open this select menu
              </option>
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
            <Form.Label>
              University Details{" "}
              <span className="badge bg-warning float-right" style={{ fontSize: "9px" }}>
                Medium
              </span>
            </Form.Label>

            <FormInput
              type="text"
              name="university_details"
              placeholder="Enter university details"
              containerClass={"mb-3"}
              register={register}
              key="university_details"
              value={formData.university_details}
              onChange={handleInputChange}
              errors={errors}
              control={control}
            />
          </Col>
        </Row>

        <h5 className="mb-3 text-uppercase bg-light p-2 mt-3">
          <i className="mdi mdi-office-building me-1"></i> Co-Applicant Details
        </h5>

        <Row>
          <Col xl={6} xxl={4}>
            <Form.Label>
              Primary Co-Applicant Details{" "}
              <span className="badge bg-danger float-right" style={{ fontSize: "9px" }}>
                High
              </span>
            </Form.Label>
            <Form.Select className="mb-3" aria-label="Default select example" value={primaryApplicant} onChange={(e: any) => setPrimaryApplicant(e.target.value)}>
              <option value="" disabled>
                Open this select menu
              </option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Siblings (brother/sister)">Siblings (brother/sister)</option>
              <option value="Husband/Wife">Husband/Wife</option>
              <option value="In-laws (Father/Mother/Brother/Sister in law)">In-laws (Father/Mother/Brother/Sister in law)</option>
              <option value="No earning co-applicant">No earning co-applicant</option>
            </Form.Select>
          </Col>

          <Col xl={6} xxl={4}>
            <Form.Label>
              Type Of Profession{" "}
              <span className="badge bg-danger float-right" style={{ fontSize: "9px" }}>
                High
              </span>
            </Form.Label>
            <Form.Select className="mb-3" aria-label="Default select example" value={typeOfProfossion} onChange={(e: any) => setTypeOfProfossion(e.target.value)}>
              <option value="" disabled>
                Open this select menu
              </option>
              <option value="Salaried">Salaried</option>
              <option value="Self Employed">Self Employed</option>
              <option value="Business">Business</option>
              <option value="Retired with Pension">Retired with Pension</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Not Salaried">Not Salaried</option>
            </Form.Select>
          </Col>

          <Col xl={6} xxl={4}>
            <Form.Label>
              Salary Range{" "}
              <span className="badge bg-danger float-right" style={{ fontSize: "9px" }}>
                High
              </span>
            </Form.Label>
            <Form.Select className="mb-3" aria-label="Default select example" value={salaryRange} onChange={(e: any) => setSalaryRange(e.target.value)}>
              <option value="" disabled>
                Open this select menu
              </option>
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
            <Form.Label>
              Collateral Availability{" "}
              <span className="badge bg-danger float-right" style={{ fontSize: "9px" }}>
                High
              </span>
            </Form.Label>
            <Form.Select aria-label="Default select example" value={collatralItem} onChange={(e: any) => setCollatralItem(e.target.value)}>
              <option value="" disabled>
                Open this select menu
              </option>
              <option value="House with Land">House with Land</option>
              <option value="House with housing loan">House With Housing Loan</option>
              <option value="FD">FD</option>
              <option value="Gold">Gold</option>
              <option value="Land without House">Land Without House</option>
              <option value="Government Bonds">Government Bonds</option>
              <option value="No collateral security available">No collateral security available</option>
            </Form.Select>
          </Col>

          <Button variant="primary" className="mt-4" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Row>
      </>
    </>
  );
};

export default PreliminaryScreening;
