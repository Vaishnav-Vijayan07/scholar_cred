import React, { useEffect, useState } from "react";
import { Row, Col, Card, Tab, Nav, Button, Dropdown } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";

import UserBox from "./UserBox";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComment, getStudentById } from "../../../redux/actions";
import { RootState } from "../../../redux/store";
import StatisticsWidget2 from "../../../components/StatisticsWidget2";
import Comments from "./Comments";
import Attachments from "./Attachments";
import { showErrorAlert, showSuccessAlert } from "../../../constants/alerts";
import classNames from "classnames";

interface Params {
  id: string;
  [key: string]: string | undefined;
}

const Profile = () => {
  const { id } = useParams<Params>();
  const numericId: number | undefined = id ? parseInt(id, 10) : undefined;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preliminaryDetails, setPreliminaryDetails] = useState({});
  const [preliminaryLoading, setPreliminaryLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [internalStatus, setInternalStatus] = useState([]);

  const { StudentData, loading, CommentsData, CommentsLoading } = useSelector((state: RootState) => ({
    StudentData: state.Students.studentById,
    CommentsData: state.Comments.comments.data,
    CommentsLoading: state.Comments.loading,
    loading: state.Students.loading,
  }));

  const getPrilimineryDetailsApi = () => {
    setPreliminaryLoading(true);
    axios
      .post("getPrilimineryDetails", { student_id: id })
      .then((res) => {
        setPreliminaryLoading(false);
        setPreliminaryDetails(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
        setPreliminaryLoading(false);
      });
  };

  const getStudentDetails = () => {
    dispatch(getStudentById(id ? id : ""));
  };

  const getAttachments = async () => {
    try {
      const response = await axios.get(`getAttachmentsByStudentId/${id}`);
      setAttachments(response.data.data);
    } catch (error) {
      // setError(error);
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    getPrilimineryDetailsApi();
    if (id) getStudentDetails();
    if (id) getAttachments();
    if (numericId) dispatch(getComment(numericId));
  }, []);

  useEffect(() => {
    getInternalStatus();
    if (!id) {
      navigate("/cred-admin/students");
    }
  }, []);

  const getInternalStatus = () => {
    axios.get("internalStatus").then((res) => {
      console.log("res==>", res.data);
      setInternalStatus(res.data);
    });
  };

  const handleAppprove = () => {
    setIsLoading(true);
    axios
      .post(`/update_student_status/${id}`, { status: true })
      .then((res) => {
        showSuccessAlert("Student approved successfully...");
        setIsLoading(false);
        getStudentDetails();
      })
      .catch((err) => {
        showErrorAlert("Error occured");
        setIsLoading(false);
        console.log(err);
      });
  };

  const handleChangeStatus = (status_id: string) => {
    axios
      .post(`update_status/${id}`, { internal_status_id: status_id })
      .then((res) => {
        console.log("res", res);
        showSuccessAlert("Status changed successfully");
        getStudentDetails();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Contacts", path: "/apps/contacts/profile" },
          { label: "Profile", path: "/apps/contacts/profile", active: true },
        ]}
        title={"Profile"}
      />
      <Row>
        <Col xl={4} lg={4}>
          {/* User information */}
          <UserBox StudentData={StudentData} loading={loading} />

          <Col>
            <StatisticsWidget2
              variant="blue"
              description="Application status"
              stats={StudentData?.status_name || "Pending"}
              icon="fe-aperture"
              progress={StudentData?.current_stage == "0" ? 0 : StudentData?.current_stage == "1" ? 50 : 100}
              counterOptions={{
                prefix: "$",
              }}
            />
          </Col>

          {/* <Col>
            <StatisticsWidget2
              variant="success"
              description="Loan status"
              stats={StudentData?.loan_status ? StudentData?.loan_status : "Pending"}
              icon="fe-aperture"
              progress={StudentData?.current_stage == "0" ? 0 : StudentData?.current_stage == "1" ? 50 : 100}
              counterOptions={{
                prefix: "$",
              }}
            />
          </Col> */}
          {/* Internal status */}
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col className="col-2">
                    <div className={classNames("avatar-sm", "rounded", "bg-" + "secondary")}>
                      <i className={classNames("fe-monitor", "avatar-title font-22 text-white")}></i>
                    </div>
                  </Col>
                  <Col className="col-10">
                    <div className="text-end">
                      <h4 className="text-dark my-1">
                        <span>{StudentData?.internal_status_name || "Student Created"}</span>
                      </h4>
                      <p className="text-muted mb-1 text-truncate">{"Internal Status"}</p>
                    </div>
                  </Col>
                </Row>
                <div className="mt-3">
                  <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle className="cursor-pointer" variant="light">
                      Change status
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {internalStatus?.map((item: any) => (
                        <Dropdown.Item eventKey={item.id} key={item.id} onClick={() => handleChangeStatus(item?.id)}>
                          {item.status_name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Col>

        <Col xl={8} lg={8}>
          <Tab.Container defaultActiveKey="preliminary_screening">
            <Card>
              <Card.Body>
                {/* <TimeLine /> */}
                <div className="d-flex w-100 justify-content-end mb-2">
                  {!StudentData?.status ? (
                    <Button variant="success" size="sm" disabled={isLoading} onClick={handleAppprove}>
                      {isLoading ? "Loading…" : "Approve Student"}
                    </Button>
                  ) : (
                    <Button variant="success" size="sm" disabled={true}>
                      Approved
                    </Button>
                  )}
                </div>
                <Comments CommentsData={CommentsData} studentId={numericId} />
                <Col>
                  <Attachments attachments={attachments} studentId={id} getAttachments={getAttachments} />
                </Col>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
