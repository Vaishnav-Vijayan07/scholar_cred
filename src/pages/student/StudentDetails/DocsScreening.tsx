import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDownload } from "../../../hooks/useDownload";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { getFileExtension, truncateText } from "../../../constants/functons";
import { showErrorAlert, showSuccessAlert } from "../../../constants/alerts";

interface Option {
  label: string;
  value: string;
}

interface FormField {
  id: string;
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
  const [ImageUrls, setImageUrls] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState<any>([]);

  console.log("ImageUrls===>", ImageUrls);

  const handleUpload = (index: any, childIndex: any, documentType: string, documentName: string) => {
    console.log(`${index}-${childIndex}`);

    console.log("documentType", documentType);
    console.log("documentName", documentName);

    const key = `${index}-${childIndex}`;
    const file = selectedFile[key];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("documentType", documentType);
      formData.append("documentName", documentName);
      formData.append("student_id", student_id || "");
      // You can replace the URL with your server endpoint
      axios
        .post("uploadAllDocuments", formData)
        .then((data) => {
          // Handle the response from the server
          console.log("File uploaded successfully", data);
          showSuccessAlert("File uploaded successfully..");
          fetchDataFromAPI();
        })
        .catch((error) => {
          console.error("Error uploading file", error);
          showErrorAlert("Error uploading file..");
        });
    } else {
      console.error("No file selected for index", index);
    }
  };

  const handleFileChange = (event: any, parentIndex: any, childIndex: any) => {
    const file = event.target.files[0];
    const key = `${parentIndex}-${childIndex}`;
    setSelectedFile((prevFiles: any) => ({ ...prevFiles, [key]: file }));
  };

  // const onClick = useCallback(async () => {
  //   var zip = new JSZip();

  //   zip.file("ReadMe.txt", "Open the documents folder to see all files.\n");

  //   const documentsFolder = zip.folder("documents");

  //   const downloadPromises = Object.entries(ImageUrls).map(async ([key, value]: any) => {
  //     if (value) {
  //       try {
  //         const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}${value}`, {
  //           responseType: "blob",
  //         });

  //         console.log("response ===>", response);

  //         const extension = getFileExtension(value);
  //         console.log("extension ==>", extension);

  //         const blobData = response.data;

  //         // Handle different file types
  //         if (["pdf", "txt", "png", "jpeg", "jpg", "xlsx"].includes(extension.toLowerCase())) {
  //           documentsFolder?.file(`${key.replace("_url", "")}.${extension}`, blobData);
  //         } else {
  //           // Handle other file types if needed
  //         }

  //         await Promise.all(downloadPromises);

  //         zip.generateAsync({ type: "blob" }).then(function (content) {
  //           saveAs(content, "Documents.zip");
  //         });
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //         // Handle errors here
  //       }
  //     }
  //   });
  // }, [ImageUrls]);

  const onClick = useCallback(async () => {
    try {
      var zip = new JSZip();
      zip.file("ReadMe.txt", "Open the documents folder to see all files.\n");
      const documentsFolder = zip.folder("documents");

      // Use Promise.all to wait for all file downloads
      await Promise.all(
        Object.entries(ImageUrls).map(async ([key, value]: any) => {
          if (value) {
            try {
              const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}${value}`, {
                responseType: "blob",
              });

              console.log("response ===>", response);

              const extension = getFileExtension(value);
              console.log("extension ==>", extension);

              const blobData = response.data;

              // Handle different file types
              if (["pdf", "txt", "png", "jpeg", "jpg", "xlsx"].includes(extension.toLowerCase())) {
                documentsFolder?.file(`${key.replace("_url", "")}.${extension}`, blobData);
              } else {
                // Handle other file types if needed
              }
            } catch (error) {
              console.error("Error fetching data:", error);
              // Handle errors here
            }
          }
        })
      );

      // Generate and save the ZIP file after all files are downloaded
      zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, "Documents.zip");
      });
    } catch (error) {
      console.error("Error in onClick:", error);
      // Handle errors here
    }
  }, [ImageUrls]);

  const fetchDataFromAPI = async () => {
    try {
      // Replace 'API_ENDPOINT' with the actual endpoint of your API
      if (StudentData?.loan_type) {
        const loanType = StudentData?.loan_type;

        let apiEndpoint;

        // Determine the API endpoint based on the loan type
        if (loanType == "SECURE") {
          apiEndpoint = `getSecuredDocumentsDataById/${student_id}`;
        } else {
          apiEndpoint = `getUnSecuredDocumentsDataById/${student_id}`;
        }

        // const response = await axios.get(`getSecuredScreeningData/${student_id}`);
        const response = await axios.get(apiEndpoint);

        const apiResponse = await response.data.data.sections;

        setFormData(apiResponse);

        // Process the API response and extract key-value pairs
        const extractedData: { [key: string]: string } = {};
        apiResponse.forEach((sections: any) => {
          sections.rows.forEach((field: any) => {
            extractedData[field.id] = field.value || "";
          });
        });
        setImageUrls(extractedData);
      } else {
        // const response = await axios.get(`getSecuredScreeningData/${student_id}`);
        const response = await axios.get(`getUnSecuredDocumentsDataById/1`);

        const apiResponse = await response.data.data.sections;
        // console.log("apiResponse: ", apiResponse);

        setFormData(apiResponse);

        // Process the API response and extract key-value pairs
        const extractedData: { [key: string]: string } = {};
        apiResponse.forEach((section: any) => {
          section.rows.forEach((field: any) => {
            extractedData[field.id] = field.value || "";
          });
        });
        setImageUrls(extractedData);
      }
    } catch (error) {
      console.error("Error fetching data from API", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
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
          {rows.map((field, childIndex) => (
            <Col key={field.name} xl={6} xxl={6} className="p-2">
              <Form.Group controlId={field.name}>
                <Form.Label>
                  <span className="text-danger">*</span> {field.label}
                </Form.Label>

                <Card className="mt-1 mb-0 shadow-none border">
                  {field.value ? (
                    <div className="p-2">
                      <Row className="align-items-center">
                        {/* {!f.preview && ( */}
                        <Col className="col-auto">
                          <div className="avatar-sm">
                            <span className="avatar-title bg-primary rounded">{field.value?.split(".")?.pop()?.toLowerCase() || "nil"}</span>
                          </div>
                        </Col>
                        {/* )} */}

                        <Col className="ps-0" lg={7}>
                          {field.value ? (
                            <Link to="#" className="text-muted fw-bold">
                              {truncateText(field.value?.replace("uploads\\", ""), 20)}
                            </Link>
                          ) : (
                            <Form.Control type="file" size="sm" />
                          )}
                        </Col>

                        <Col className="text-end">
                          {field.value && (
                            <Link
                              to={`${process.env.REACT_APP_BACKEND_URL}${field.value}`}
                              target="_blank"
                              className={`btn btn-link btn-lg shadow-none ${!field.value && "text-muted"}`}
                            >
                              <i className="dripicons-download"></i>
                            </Link>
                          )}
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    <div className="input-group" key={`${index}-${childIndex}`}>
                      <input type="file" className="form-control" id={`customFile-${index}-${childIndex}`} onChange={(e) => handleFileChange(e, index, childIndex)} />
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => handleUpload(index, childIndex, field.type, field.id)}
                        disabled={!selectedFile[`${index}-${childIndex}`]}
                      >
                        <i className="dripicons-upload"></i>
                      </button>
                    </div>
                  )}
                </Card>
              </Form.Group>
            </Col>
          ))}
        </Row>
      </div>
    ));
  };

  return (
    <>
      <Button variant="success" className="btn-xs waves-effect waves-light float-end" onClick={onClick}>
        Download all
      </Button>
      <Form className="pt-3">{renderFormItems()}</Form>{" "}
    </>
  );
};

export default DetailedScreening;
