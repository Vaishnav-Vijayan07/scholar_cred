import React, { useEffect, useRef } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import profileImg from "../../../assets/images/avatar-logo.png";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addInitData, updateInitData } from "../../../redux/Forex/Initiations/actions";
import { RootState } from "../../../redux/store";

const UserBox = ({ StudentData, loading, handleAppprove, isLoading }: any) => {
  const { search } = useLocation();
  const { id } = useParams<{ id: string }>();
  const searchParam = search?.split("?")[1];
  const loanStatusRef = useRef<any>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const forexInitLoading = useSelector((state: RootState) => state.ForexInit.loading);

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

  const handleInitiateForex = (student_id: string | number) => {
    dispatch(addInitData(student_id, navigate));
  };

  return (
    <Card className="text-center">
      <Card.Body style={{ minHeight: "400px" }}>
        {loading ? (
          <Spinner animation="border" style={{ position: "absolute", top: "50%", left: "50%" }} />
        ) : (
          <>
            <img src={profileImg} className="rounded-circle avatar-lg img-thumbnail" alt="" />
            <h4 className="">{StudentData?.first_name + " " + StudentData?.last_name}</h4>
            <div className="d-flex justify-content-center">
              <div className="d-flex gap-2">
                <div>
                  <Button
                    variant="success"
                    size="sm"
                    disabled={isLoading || StudentData?.status}
                    onClick={handleAppprove}
                    className="btn-xs waves-effect mb-2 waves-light"
                  >
                    {isLoading ? "Loading…" : "Initiate loan process"}
                  </Button>
                </div>

                <div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="btn-xs waves-effect mb-2 waves-light"
                    onClick={() => handleInitiateForex(StudentData?.student_id)}
                    disabled={StudentData?.forex_initiation_id}
                  >
                    {forexInitLoading ? "Loading…" : "Initate Forex"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-center mt-3">
              <h4 className="font-13 text-uppercase mb-3">About</h4>
              <p className="text-muted mb-2 font-13">
                <strong>Full Name : {StudentData?.first_name + " " + StudentData?.last_name}</strong>
                <span className="ms-2"></span>
              </p>

              {StudentData?.date_of_birth && (
                <p className="text-muted mb-2 font-13">
                  <strong>DOB :</strong>
                  <span className="ms-2">{moment(StudentData?.date_of_birth).format("DD-MM-YYYY")}</span>
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

              <p ref={loanStatusRef} className="text-muted mb-2 font-13 rounded-4">
                <strong>Loan Status :</strong>
                <span className="ms-2">{StudentData?.loan_status_name || "Pending"}</span>
              </p>

              <p className="text-muted mb-2 font-13">
                <strong>Application Status :</strong>
                <span className="ms-2">{StudentData?.application_status_name || "Student Created"}</span>
              </p>

              <p className="text-muted mb-2 font-13">
                <strong>Internal Status :</strong>
                <span className="ms-2">{StudentData?.internal_status_name || "Student Created"}</span>
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
