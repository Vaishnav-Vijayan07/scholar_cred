import React from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import profileImg from "../../../assets/images/avatar-logo.png";
import moment from "moment";

const UserBox = ({ StudentData, loading, handleAppprove, isLoading }: any) => {
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
            {StudentData?.imageurl ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/${StudentData?.imageurl}`}
                className="rounded-circle avatar-lg img-thumbnail"
                alt="avatar"
              />
            ) : (
              <img
                src={profileImg}
                className="rounded-circle avatar-lg img-thumbnail"
                alt="avatar"
              />
            )}
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
                className="btn-xs waves-effect mb-2 waves-light"
                size="sm"
                disabled={isLoading}
                onClick={handleAppprove}
              >
                {isLoading ? "Loading…" : "Initiation loan process"}
              </Button>
            ) : (
              <Button
                variant="success"
                className="btn-xs waves-effect mb-2 waves-light"
                size="sm"
                disabled={true}
              >
                Initiation loan processed
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

              <p className="text-muted mb-2 font-13">
                <strong>Mobile :</strong>
                <span className="ms-2">{StudentData?.phone}</span>
              </p>

              <p className="text-muted mb-2 font-13">
                <strong>Email :</strong>
                <span className="ms-2 ">{StudentData?.email}</span>
              </p>

              <p className="text-muted mb-2 font-13">
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
                <strong>Current Stage :</strong>
                <span className="ms-2">{StudentData?.current_stage}</span>
              </p>

              <p className="text-muted mb-2 font-13">
                <strong>Loan Type :</strong>
                <span className="ms-2">{StudentData?.loan_type}</span>
              </p>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserBox;
