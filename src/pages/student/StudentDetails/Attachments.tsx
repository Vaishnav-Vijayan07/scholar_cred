import { Card, Row, Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// components
import FileUploader from "../../../components/FileUploader";
import { useState } from "react";
import axios from "axios";
import { showErrorAlert, showSuccessAlert, showWarningAlert } from "../../../constants/alerts";

const Attachments = ({ attachments, studentId, getAttachments }: any) => {
  console.log("attachments", attachments);
  console.log("studentId", studentId);
  const [selectedFile, setSelectedFile] = useState([]);

  const handleSubmit = async () => {
    if (selectedFile.length < 1) {
      showWarningAlert("Please choose a file");
      return;
    }

    const file = selectedFile[0];

    // Perform file validation
    if (!validateFile(file)) {
      showWarningAlert("Invalid file format or size");
      console.error("Invalid file format or size");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);
    formData.append("student_id", studentId);

    try {
      const response = await axios.post("/comment_attachments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        showSuccessAlert("File uploaded successfully!");
        // You may want to update the state or perform additional actions after successful upload
        console.log("response--->", response);
        setSelectedFile([]);
        getAttachments();
      } else {
        console.error("Failed to upload file");
        showErrorAlert("Failed to upload file");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  // Function to validate the selected file
  const validateFile = (file: any) => {
    // Define allowed file formats and size limit
    const allowedFormats = ["jpg", "jpeg", "png", "gif", "mp4", "xlsx"]; // Add more if needed
    const maxSizeInMB = 10; // Set your desired size limit

    // Get the file extension
    const fileExtension = file.name.split(".").pop().toLowerCase();

    // Check if the file format is allowed
    if (!allowedFormats.includes(fileExtension)) {
      console.error("Invalid file format");
      return false;
    }

    // Check if the file size is within the limit
    if (file.size > maxSizeInMB * 1024 * 1024) {
      console.error("File size exceeds the limit");
      return false;
    }

    return true;
  };

  return (
    <>
      <div className="p-3">
        <h5 className="card-title font-16 mb-3">Attachments</h5>
        {attachments?.map((item: any) => (
          <Card className="mb-1 shadow-none border">
            <div className="p-2">
              <Row className="align-items-center">
                <div className="col-auto">
                  <div className="avatar-sm">
                    <span className="avatar-title badge-soft-primary text-primary rounded">{item.file_url?.split(".")[1]}</span>
                  </div>
                </div>
                <div className="col ps-0">
                  <Link to="#" className="text-muted fw-bold">
                    {item.file_url?.split("-")[1]}
                  </Link>
                  <p className="mb-0 font-12">3.5 MB</p>
                </div>
                <div className="col-auto">
                  <Link to={`${process.env.REACT_APP_BACKEND_URL}${item?.file_url}`} className="btn btn-link font-16 text-muted" target="_blank">
                    <i className="dripicons-download"></i>
                  </Link>
                </div>
              </Row>
            </div>
          </Card>
        ))}

        <br />
        <FileUploader selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        <Button className="float-end" onClick={handleSubmit}>
          Upload
        </Button>
      </div>
    </>
  );
};

export default Attachments;
