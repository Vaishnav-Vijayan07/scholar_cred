import axios from "axios";
import moment from "moment";
import React, { useState, ChangeEvent, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { saveSecuredDetailedScreeningData } from "../../../redux/actions";

interface Option {
  label: string;
  value: string;
}

interface FormField {
  label: string;
  name: string;
  type: "text" | "email" | "select" | "radio" | "date" | "number";
  value: string;
  options?: Option[];
  priority: string;
}

interface Section {
  heading: string;
  icon?: string;
  className?: string;
}

interface SectionedDynamicFormProps {
  student_id?: string;
  StudentData?: any;
}

const DetailedScreening: React.FC<SectionedDynamicFormProps> = ({ student_id, StudentData }) => {
  //   const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    // Add more fields as needed
  });
  const [formData, setFormData] = useState<Array<{ section: Section; fields: FormField[] }>>([]);
  const disptach = useDispatch();

  console.log("formData, DetailedScreening ----->", formValues);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here with formValues
    disptach(
      saveSecuredDetailedScreeningData(
        student_id || "",
        formValues.scored_below_60,
        formValues.univerist_rank,
        formValues.program_types,
        formValues.exsiting_loans,
        formValues.late_payment_history,
        "", //know_the_current_cibil
        formValues.cibil_score,
        formValues.relationship_with_student,
        formValues.place_of_recidence,
        formValues.pan_aadhar_availability,
        formValues.professional_background,
        formValues.income_range,
        formValues.proof_of_income,
        "", //know_the_current_cibil_co_applicant
        formValues.cibil_score
      )
    );
  };

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        // Replace 'API_ENDPOINT' with the actual endpoint of your API
        if (StudentData?.loan_type) {
          const loanType = StudentData?.loan_type;

          let apiEndpoint;

          // Determine the API endpoint based on the loan type
          if (loanType === "SECURE") {
            apiEndpoint = `getSecuredScreeningData/${student_id}`;
          } else {
            apiEndpoint = `getUnSecuredScreeningData/${student_id}`;
          }

          console.log("apiEndpoint======>", apiEndpoint);

          // const response = await axios.get(`getSecuredScreeningData/${student_id}`);
          const response = await axios.get(apiEndpoint);

          const apiResponse = await response.data.data;
          // console.log("apiResponse ========>", apiResponse);

          setFormData(apiResponse);

          // Process the API response and extract key-value pairs
          const extractedData: { [key: string]: string } = {};
          apiResponse.forEach((section: any) => {
            section.fields.forEach((field: any) => {
              extractedData[field.name] = field.value || "";
            });
          });

          // Set the form values state
          setFormValues(extractedData);
        } else {
          // const response = await axios.get(`getSecuredScreeningData/${student_id}`);
          const response = await axios.get(`getSecuredScreeningData/${student_id}`);

          const apiResponse = await response.data.data;
          // console.log("apiResponse ========>", apiResponse);

          setFormData(apiResponse);

          // Process the API response and extract key-value pairs
          const extractedData: { [key: string]: string } = {};
          apiResponse.forEach((section: any) => {
            section.fields.forEach((field: any) => {
              extractedData[field.name] = field.value || "";
            });
          });

          // Set the form values state
          setFormValues(extractedData);
        }
      } catch (error) {
        console.error("Error fetching data from API", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchDataFromAPI();
  }, [StudentData?.loan_type]);

  const itemsPerRow = 2;

  const renderFormItems = () => {
    return formData.map(({ section, fields }, index) => (
      <div key={index}>
        <h5 className={"mb-3 text-uppercase bg-light p-2 mt-3"}>
          {section.icon && <i className={section.icon}></i>} {section.heading}
        </h5>
        <Row>
          {fields.map((field) => (
            <Col key={field.name} xl={6} xxl={4} className="p-2">
              <Form.Group controlId={field.name}>
                <Form.Label>
                  {field.label}{" "}
                  {field?.priority == "High" && (
                    <span className="badge bg-danger float-right" style={{ fontSize: "9px" }}>
                      {field?.priority}
                    </span>
                  )}
                  {field?.priority == "Medium" && (
                    <span className="badge bg-warning float-right" style={{ fontSize: "9px" }}>
                      {field?.priority}
                    </span>
                  )}
                  {field?.priority == "Low" && (
                    <span className="badge bg-success float-right" style={{ fontSize: "9px" }}>
                      {field?.priority}
                    </span>
                  )}
                </Form.Label>

                {field.type === "text" || field.type === "email" || field.type === "number" ? (
                  <Form.Control type={field.type as "text" | "email" | "number"} name={field.name} value={formValues[field.name] || ""} onChange={handleInputChange} />
                ) : field.type === "select" ? (
                  <Form.Select as="select" name={field.name} value={formValues[field.name] || ""} onChange={(event: any) => handleSelectChange(field.name, event.target.value)}>
                    <option disabled value="">
                      Choose an option...
                    </option>
                    {(field as { options: Option[] }).options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                ) : field.type === "radio" ? (
                  <div className="d-flex gap-2">
                    {(field as { options: Option[] }).options?.map((option) => (
                      <Form.Check
                        key={option.value}
                        type="radio"
                        label={option.label}
                        name={field.name}
                        value={option.value}
                        checked={formValues[field.name] === option.value}
                        onChange={handleInputChange}
                      />
                    ))}
                  </div>
                ) : field.type === "date" ? (
                  <Form.Control type="date" name={field.name} value={moment(formValues[field.name]).format("YYYY-MM-DD") || ""} onChange={handleInputChange} />
                ) : null}
              </Form.Group>
            </Col>
          ))}
        </Row>
      </div>
    ));
  };

  return (
    <Form onSubmit={handleSubmit}>
      {renderFormItems()}
      <Button variant="primary" className="mt-2" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default DetailedScreening;
