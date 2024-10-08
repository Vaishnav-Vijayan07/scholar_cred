import React, { useEffect, useRef } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import profileImg from "../../../assets/images/avatar-logo.png";
import moment from "moment";

const UserBox = ({ StudentData, loading, handleAppprove, isLoading }: any) => {
  const { search } = useLocation();
  const { id } = useParams<{ id: string }>();
  const searchParam = search?.split("?")[1];
  const loanStatusRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParam && loanStatusRef.current) {
      setTimeout(() => {
        loanStatusRef.current.classList.add("highlighted-userbox");
        setTimeout(() => {
          loanStatusRef.current.classList.remove("highlighted-userbox");
          navigate(`/users/student-details-consultant/${id}`, {
            replace: true,
          });
        }, 1000);
      }, 500);
    }
  }, [id, searchParam]);

  console.log("StudentData=====>", StudentData);

  return (
    <Card className="text-center">
      <Card.Body style={{ minHeight: "400px" }}>
        {loading ? (
          <Spinner
            animation="border"
            style={{ position: "absolute", top: "50%", left: "50%" }}
          />
        ) : (
          <>
            <img
              src={profileImg}
              className="rounded-circle avatar-lg img-thumbnail"
              alt=""
            />
            <h4 className="">
              {StudentData?.first_name + " " + StudentData?.last_name}
            </h4>
            {/* <p className="text-muted">@webdesigner</p> */}
            {/* <button type="button" className="btn btn-success btn-xs waves-effect mb-2 waves-light">
              Call
            </button>{" "}
            <button type="button" className="btn btn-danger btn-xs waves-effect mb-2 waves-light">
              Message
            </button>{" "} */}
            {!StudentData?.status ? (
              <Button
                variant="success"
                size="sm"
                disabled={isLoading}
                onClick={handleAppprove}
                className="btn-xs waves-effect mb-2 waves-light"
              >
                {isLoading ? "Loading…" : "Initiate loan process"}
              </Button>
            ) : (
              <Button
                variant="success"
                size="sm"
                disabled={true}
                className="btn-xs waves-effect mb-2 waves-light"
              >
                Initiate loan process
              </Button>
            )}
            <div className="text-center mt-3">
              <h4 className="font-13 text-uppercase mb-3">About</h4>
              {/* <p className="text-muted font-13 mb-3">
            Hi I'm Johnathn Deo,has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
          </p> */}
              <p className="text-muted mb-2 font-13">
                <strong>
                  Full Name :{" "}
                  {StudentData?.first_name + " " + StudentData?.last_name}
                </strong>
                <span className="ms-2"></span>
              </p>

              {StudentData?.date_of_birth && (
                <p className="text-muted mb-2 font-13">
                  <strong>DOB :</strong>
                  <span className="ms-2">
                    {moment(StudentData?.date_of_birth).format("DD-MM-YYYY")}
                  </span>
                </p>
              )}

              <p className="text-muted mb-2 font-13">
                <strong>Mobile :</strong>
                <span className="ms-2">{StudentData?.phone}</span>
              </p>

              <p className="text-muted mb-2 font-13">
                <strong>Email :</strong>
                <span className="ms-2 ">{StudentData?.email}</span>
              </p>
              {StudentData?.country_of_origin && (
                <p className="text-muted mb-2 font-13">
                  <strong>Location :</strong>
                  <span className="ms-2">{StudentData?.country_of_origin}</span>
                </p>
              )}

              <p
                ref={loanStatusRef}
                className="text-muted mb-2 font-13 rounded-4"
              >
                <strong>Loan Status :</strong>
                <span className="ms-2">
                  {StudentData?.loan_status_name || "Pending"}
                </span>
              </p>

              <p className="text-muted mb-2 font-13">
                <strong>Application Status :</strong>
                <span className="ms-2">
                  {StudentData?.application_status_name || "Student Created"}
                </span>
              </p>

              <p className="text-muted mb-2 font-13">
                <strong>Internal Status :</strong>
                <span className="ms-2">
                  {StudentData?.internal_status_name || "Student Created"}
                </span>
              </p>

              <p className="text-muted mb-2 font-13">
                <strong>Current Stage :</strong>
                <span className="ms-2">{StudentData?.current_stage}</span>
              </p>

              {StudentData?.loan_type && (
                <p className="text-muted mb-2 font-13">
                  <strong>Loan Type :</strong>
                  <span className="ms-2">{StudentData?.loan_type}</span>
                </p>
              )}
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserBox;
