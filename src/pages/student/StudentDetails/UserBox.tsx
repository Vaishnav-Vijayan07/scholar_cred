import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import profileImg from "../../../assets/images/users/user-1.jpg";
import moment from "moment";
import Skeleton from "react-loading-skeleton";

const UserBox = ({ StudentData, loading }: any) => {
  console.log("StudentData=====>", StudentData);

  return (
    <Card className="text-center">
      <Card.Body>
        <>
          <img src={profileImg} className="rounded-circle avatar-lg img-thumbnail" alt="" />
          <h4 className="">{StudentData?.first_name + " " + StudentData?.last_name}</h4>
          {/* <p className="text-muted">@webdesigner</p> */}
          <button type="button" className="btn btn-success btn-xs waves-effect mb-2 waves-light">
            Call
          </button>{" "}
          <button type="button" className="btn btn-danger btn-xs waves-effect mb-2 waves-light">
            Message
          </button>
          <div className="text-center mt-3">
            <h4 className="font-13 text-uppercase mb-3">About :</h4>
            {/* <p className="text-muted font-13 mb-3">
            Hi I'm Johnathn Deo,has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
          </p> */}
            <p className="text-muted mb-2 font-13">
              <strong>Full Name : {StudentData?.first_name + " " + StudentData?.last_name}</strong>
              <span className="ms-2"></span>
            </p>

            <p className="text-muted mb-2 font-13">
              <strong>DOB :</strong>
              <span className="ms-2">{moment(StudentData?.date_of_birth).format("DD-MM-YYYY")}</span>
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
              <strong>Location :</strong>
              <span className="ms-2">{StudentData?.country_of_origin}</span>
            </p>

            <p className="text-muted mb-2 font-13">
              <strong>Loan Status :</strong>
              <span className="ms-2">{StudentData?.loan_status}</span>
            </p>

            <p className="text-muted mb-2 font-13">
              <strong>Application Status :</strong>
              <span className="ms-2">{StudentData?.application_status}</span>
            </p>

            <p className="text-muted mb-2 font-13">
              <strong>Current Stage :</strong>
              <span className="ms-2">{StudentData?.current_stage}</span>
            </p>
          </div>
        </>
      </Card.Body>
    </Card>
  );
};

export default UserBox;
