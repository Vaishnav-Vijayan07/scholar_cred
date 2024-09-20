import { Button, Card, Spinner } from "react-bootstrap";
import profileImg from "../../../assets/images/avatar-logo.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateBookingStatus,
  uploadSwift,
} from "../../../redux/Ebix_staff/actions";
import { Link } from "react-router-dom";

const UploadBox = ({
  error,
  forex_id,
  student_id,
  swift_url,
  paid_to,
  email,
  first_name,
  last_name,
  loading,
  status,
}: any) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bookingStatus, setBookingStatus] = useState("");
  const dispatch = useDispatch();


  console.log(status);
  

  const shortUrl = swift_url?.split("/").slice(0, 3).join("/") + "...";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setSelectedFile(selectedFile);
    } else {
      alert("Please select a valid PDF file");
    }
  };

  const handleSave = () => {
    dispatch(updateBookingStatus(bookingStatus, forex_id, student_id));
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
                {first_name} {last_name}
              </h4>
              <div className="text-center mt-3">
                <p className="text-muted mb-2 font-13">
                  <strong>Email :</strong>
                  <span className="ms-2">{email}</span>
                </p>
                <p className="text-muted mb-2 font-13">
                  <strong>University :</strong>
                  <span className="ms-2">{paid_to}</span>
                </p>
                <p className="text-muted mb-2 font-13">
                  <strong>Order Status :</strong>
                  <span className="ms-2">{status}</span>
                </p>
              </div>
            </div>
            {swift_url ? (
              <>
                <p className="text-muted mb-2 font-13">
                  <strong>Swift copy URL :</strong>
                  <Link to={swift_url}>
                    <span className="ms-2">{shortUrl}</span>
                  </Link>
                </p>
              </>
            ) : (
              <div className="">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleChange}
                  style={{ display: "none" }}
                  id="pdfUpload"
                />

                {status === "Order Booked" ? (
                  <>
                    <div>
                      <select
                        className="form-control form-select mt-2"
                        value={bookingStatus}
                        onChange={(e) => setBookingStatus(e.target.value)}
                      >
                        <option value="" hidden>
                          Please choose a option
                        </option>
                        <option value="Success">Success</option>
                        <option value="Fail">Fail</option>
                      </select>
                    </div>

                    <Button
                      variant="success"
                      className="btn waves-effect mt-2 waves-light"
                      size="sm"
                      onClick={() => handleSave()}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  status !== "Order Failed" &&
                  status !== "Order Pending" && (
                    <label htmlFor="pdfUpload">
                      <Button
                        variant="success"
                        className="btn-xs waves-effect mb-2 mt-2 waves-light"
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
                  )
                )}
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
