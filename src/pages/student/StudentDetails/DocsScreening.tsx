import axios from "axios";
import moment from "moment";
import React, { useState, ChangeEvent, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Option {
  label: string;
  value: string;
}

interface FormField {
  label: string;
  name: string;
  type: "text" | "email" | "select" | "radio" | "date" | "number";
  value: string | null;
  options?: Option[];
}

interface Section {
  titile: string;
  icon?: string;
  className?: string;
}

interface SectionedDynamicFormProps {
  student_id?: string;
  StudentData?: any;
}

const DetailedScreening: React.FC<SectionedDynamicFormProps> = ({ student_id, StudentData }) => {
  const [formData, setFormData] = useState<Array<{ titile: Section; rows: FormField[] }>>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here with formValues
  };

  console.log("StudentData?.loan_type=>", StudentData?.loan_type);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        // Replace 'API_ENDPOINT' with the actual endpoint of your API
        if (StudentData?.loan_type) {
          const loanType = StudentData?.loan_type;

          let apiEndpoint;

          console.log("loanType-->", loanType);

          // Determine the API endpoint based on the loan type
          if (loanType == "SECURE") {
            apiEndpoint = `getSecuredDocumentsDataById/${student_id}`;
          } else {
            apiEndpoint = `getUnSecuredDocumentsDataById/${student_id}`;
          }

          console.log("apiEndpoint", apiEndpoint);

          // const response = await axios.get(`getSecuredScreeningData/${student_id}`);
          const response = await axios.get(apiEndpoint);

          const apiResponse = await response.data.data.sections;

          setFormData(apiResponse);

          // Process the API response and extract key-value pairs
          const extractedData: { [key: string]: string } = {};
          apiResponse.forEach((sections: any) => {
            sections.rows.forEach((field: any) => {
              extractedData[field.label] = field.value || "";
            });
          });
        } else {
          // const response = await axios.get(`getSecuredScreeningData/${student_id}`);
          const response = await axios.get(`getUnSecuredDocumentsDataById/93`);

          const apiResponse = await response.data.data.sections;
          console.log("apiResponse ========>", apiResponse);

          setFormData(apiResponse);

          // Process the API response and extract key-value pairs
          const extractedData: { [key: string]: string } = {};
          apiResponse.forEach((section: any) => {
            section.rows.forEach((field: any) => {
              extractedData[field.label] = field.value || "";
            });
          });
        }
      } catch (error) {
        console.error("Error fetching data from API", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchDataFromAPI();
  }, [StudentData?.loan_type]);

  const renderFormItems = () => {
    return formData.map(({ titile, rows }, index) => (
      <div key={index}>
        <h5 className={"mb-3 text-uppercase bg-light p-2 mt-3"}>
          {/* {sections.icon && <i className={}></i>} {sections.heading} */}
          {titile}
        </h5>
        <Row>
          {rows.map((field) => (
            <Col key={field.name} xl={6} xxl={4} className="p-2">
              <Form.Group controlId={field.name}>
                <Form.Label>
                  <span className="text-danger">*</span> {field.label}
                </Form.Label>

                <Card className="mt-1 mb-0 shadow-none border">
                  <div className="p-2">
                    <Row className="align-items-center">
                      {/* {!f.preview && ( */}
                      <Col className="col-auto">
                        <div className="avatar-sm">
                          <span className="avatar-title bg-primary rounded">{field.value?.split(".")?.pop()?.toLowerCase() || "nil"}</span>
                        </div>
                      </Col>
                      {/* )} */}

                      <Col className="ps-0">
                        <Link to="#" className="text-muted fw-bold">
                          {field.value?.split("/")[1] || "No file"}
                        </Link>
                      </Col>

                      <Col className="text-end">
                        <Link
                          to={`${process.env.REACT_APP_BACKEND_URL}${field.value}`}
                          target="_blank"
                          className={`btn btn-link btn-lg shadow-none ${!field.value && "text-muted"}`}
                        >
                          <i className="dripicons-download"></i>
                        </Link>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Form.Group>
            </Col>
          ))}
        </Row>
      </div>
    ));
  };

  console.log("FormData----------->", formData);

  return <Form onSubmit={handleSubmit}>{renderFormItems()}</Form>;
};

export default DetailedScreening;
