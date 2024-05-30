import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { getFileExtension, truncateText } from "../../../constants/functons";
import {
  showErrorAlert,
  showSuccessAlert,
  showWarningAlert,
} from "../../../constants/alerts";

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

const DetailedScreening: React.FC<SectionedDynamicFormProps> = ({
  student_id,
  StudentData,
}) => {
  const [formData, setFormData] = useState<
    Array<{ titile: Section; rows: FormField[] }>
  >([]);
  const [ImageUrls, setImageUrls] = useState<any>([]);
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [loading, setLoading] = useState<any>({});
  const [loadingDownload, setLoadingDownload] = useState<any>(false);
  const studentName = `${StudentData?.first_name} ${StudentData?.last_name}`;
  const studentMail = `${StudentData?.email}`;

  const handleUpload = async (
    index: any,
    childIndex: any,
    documentType: string,
    documentName: string
  ) => {
    const key = `${index}-${childIndex}`;
    const file = selectedFile[key];

    if (!file) {
      console.error("No file selected for index", index);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);
    formData.append("documentName", documentName);
    formData.append("student_id", student_id || "");

    let url;

    try {
      setLoading((prevLoadingFields: any) => ({
        ...prevLoadingFields,
        [key]: true,
      }));

      const fireBaseResponse = await axios.post("docUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (fireBaseResponse.data.success) {
        url = fireBaseResponse.data.url;

        formData.append("url", url);
        formData.delete("file");

        const uploadAllResponse = await axios.post("uploadAllDocuments", {
          documentType,
          documentName,
          student_id,
          url,
        });

        if (uploadAllResponse.data.success) {
          showSuccessAlert("All files uploaded successfully");
          fetchDataFromAPI();
        } else {
          showErrorAlert(uploadAllResponse.data.error);
        }
      } else {
        showErrorAlert(fireBaseResponse.data.error);
      }
    } catch (error) {
      console.error("Error uploading file", error);
      showErrorAlert("Error uploading file");
    } finally {
      setLoading((prevLoadingFields: any) => ({
        ...prevLoadingFields,
        [key]: false,
      }));
    }
  };

  const handleFileChange = (event: any, parentIndex: any, childIndex: any) => {
    const file = event.target.files[0];

    if (file.type !== "application/pdf") {
      showErrorAlert("Please select a PDF file");
      return;
    }
    const key = `${parentIndex}-${childIndex}`;
    setSelectedFile((prevFiles: any) => ({ ...prevFiles, [key]: file }));
  };

  // const onClick = useCallback(async () => {
  //   try {
  //     var zip = new JSZip();
  //     zip.file("ReadMe.txt", "Open the documents folder to see all files.\n");
  //     const documentsFolder = zip.folder("documents");
  //     console.log(ImageUrls);

  //     // Use Promise.all to wait for all file downloads
  //     await Promise.all(
  //       Object.entries(ImageUrls).map(async ([key, value]: any) => {
  //         console.log(value);

  //         if (value) {
  //           console.log("hai");

  //           try {
  //             const response = await axios.get(`${value}`, {
  //               responseType: "blob"
  //             });

  //             console.log("response ===>", response);

  //             const extension = getFileExtension(value);
  //             console.log("extension ==>", extension);

  //             const blobData = response.data;

  //             // Handle different file types
  //             if (
  //               ["pdf", "txt", "png", "jpeg", "jpg", "xlsx"].includes(
  //                 extension.toLowerCase()
  //               )
  //             ) {
  //               documentsFolder?.file(
  //                 `${key.replace("_url", "")}.${extension}`,
  //                 blobData
  //               );
  //             } else {
  //               // Handle other file types if needed
  //             }
  //           } catch (error) {
  //             console.error("Error fetching data:", error);
  //             // Handle errors here
  //           }
  //         }
  //       })
  //     );

  //     // Generate and save the ZIP file after all files are downloaded
  //     zip.generateAsync({ type: "blob" }).then(function (content) {
  //       saveAs(content, "Documents.zip");
  //     });
  //   } catch (error) {
  //     console.error("Error in onClick:", error);
  //     // Handle errors here
  //   }
  // }, [ImageUrls]);

  const onClick = async () => {
    setLoadingDownload(true);
    try {
      const response = await axios.post(
        "/download-pdf",
        { ImageUrls },
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${studentName}-${studentMail}.zip`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingDownload(false);
    }
  };

  const fetchDataFromAPI = async () => {
    try {
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
        // const response = await axios.get(`getSecuredScreeningData/${id}`);
        const response = await axios.get(`getUnSecuredDocumentsDataById/1`);

        const apiResponse = await response.data.data.sections;
        console.log("apiResponse: ", apiResponse);

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
    return formData?.map(({ titile, rows }, index) => (
      <div key={index}>
        <h5 className={"mb-3 text-uppercase bg-light p-2 mt-3"}>
          {/* {sections.icon && <i className={}></i>} {sections.heading} */}
          {titile}
        </h5>
        <Row>
          {rows?.map((field, childIndex) => (
            <Col key={field.name} xl={6} xxl={6} className="p-2">
              <Form.Group controlId={field.name}>
                <Form.Label>
                  <span className="text-danger">*</span> {field.label}
                </Form.Label>

                <Card className="mt-1 mb-0 shadow-none border">
                  {field.value ? (
                    <div className="px-2">
                      <Row className="align-items-center">
                        {/* {!f.preview && ( */}
                        {/* <Col className="col-auto">
                          <div className="avatar-sm">
                            <span className="avatar-title bg-primary rounded">
                              {field.value?.split(".")?.pop()?.toLowerCase() ||
                                "nil"}
                            </span>
                          </div>
                        </Col> */}
                        {/* )} */}

                        <Col className="" lg={7}>
                          {field.value ? (
                            <Link to="#" className="text-muted fw-bold">
                              {truncateText(
                                field.value?.replace("uploads\\", ""),
                                20
                              )}
                            </Link>
                          ) : (
                            <Form.Control type="file" size="sm" />
                          )}
                        </Col>

                        <Col className="text-end">
                          {field.value && (
                            <Link
                              to={
                                field?.value &&
                                field?.value.startsWith("uploads")
                                  ? `${process.env.REACT_APP_BACKEND_URL}${field.value}`
                                  : `${field.value}`
                              }
                              target="_blank"
                              className={`btn btn-link btn-lg shadow-none ${
                                !field.value && "text-muted"
                              }`}
                            >
                              <i className="dripicons-download"></i>
                            </Link>
                          )}
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    <>
                      <div
                        className="input-group"
                        key={`${index}-${childIndex}`}
                        id={`${index}-${childIndex}`}
                      >
                        <input
                          type="file"
                          className="form-control"
                          name={field.id}
                          id={`customFile-${index}-${childIndex}`}
                          onChange={(e) =>
                            handleFileChange(e, index, childIndex)
                          }
                        />
                        {loading[`${index}-${childIndex}`] ? (
                          <Button variant="secondary" disabled>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          </Button>
                        ) : (
                          <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() =>
                              handleUpload(
                                index,
                                childIndex,
                                field.type,
                                field.id
                              )
                            }
                            disabled={!selectedFile[`${index}-${childIndex}`]}
                          >
                            <i className="dripicons-upload"></i>
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </Card>
              </Form.Group>
            </Col>
            // <p>Error</p>
          ))}
        </Row>
      </div>
    ));
  };

  return (
    <>
      <Button
        variant="success"
        className="btn-xs waves-effect waves-light float-end"
        onClick={onClick}
        disabled={loadingDownload}
      >
        {loadingDownload ? "Downloading.." : "Download"}
      </Button>
      <Form className="pt-3">{renderFormItems()}</Form>{" "}
    </>
  );
};

export default DetailedScreening;
