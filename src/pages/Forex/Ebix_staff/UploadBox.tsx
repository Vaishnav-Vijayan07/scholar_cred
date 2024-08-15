import { Button, Card, Spinner } from "react-bootstrap";
import profileImg from "../../../assets/images/avatar-logo.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadSwift } from "../../../redux/Ebix_staff/actions";
import { Link } from "react-router-dom";

const UploadBox = ({ error, state, loading }: any) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useDispatch();

  const { forex_id, student_id } = state;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(uploadSwift(selectedFile, forex_id, student_id));
    }
  };

  return (
    <Card className="text-center" style={{ minHeight: "300px" }}>
      {loading ? (
        <Spinner
          animation="border"
          style={{ position: "absolute", top: "50%", left: "50%" }}
        />
      ) : (
        <Card.Body className="d-flex flex-column justify-content-between">
          <>
            <div>
              <img
                src={profileImg}
                className="rounded-circle avatar-lg img-thumbnail"
                alt="avatar"
              />
              <h4 className="">
                {state?.first_name} {state?.last_name}
              </h4>
              <div className="text-center mt-3">
                <p className="text-muted mb-2 font-13">
                  <strong>Email :</strong>
                  <span className="ms-2">{state?.email}</span>
                </p>
                <p className="text-muted mb-2 font-13">
                  <strong>University :</strong>
                  <span className="ms-2">{state?.paid_to}</span>
                </p>
              </div>
            </div>
            {state?.swift_url ? (
              <Link to={state?.swift_url}>{state?.swift_url}</Link>
            ) : (
              <div className="">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="pdfUpload"
                />

                <label htmlFor="pdfUpload">
                  <Button
                    variant="success"
                    className="btn-xs waves-effect mb-2 waves-light"
                    size="sm"
                    onClick={() =>
                      document.getElementById("pdfUpload")?.click()
                    }
                  >
                    Upload swift copy
                  </Button>
                  {selectedFile && (
                    <p className="mt-2 text-muted">
                      Selected file: {selectedFile.name}
                    </p>
                  )}
                </label>
              </div>
            )}
            {error && <p className="mt-1 text-danger">{error}</p>}
            {selectedFile && (
              <Button variant="primary" onClick={handleUpload}>
                Save
              </Button>
            )}
          </>
        </Card.Body>
      )}
    </Card>
  );
};

export default UploadBox;
