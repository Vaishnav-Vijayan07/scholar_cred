import React, { useEffect, useState } from "react";
import { Row, Col, Card, Tab, Nav, Button } from "react-bootstrap";

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

  const { StudentData, loading, CommentsData, CommentsLoading } = useSelector((state: RootState) => ({
    StudentData: state.Students.studentById,
    CommentsData: state.Comments.comments.data,
    CommentsLoading: state.Comments.loading,
    loading: state.Students.loading,
  }));

  const methods = useForm();
  const {
    register,
    control,
    formState: { errors },
  } = methods;

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
    if (!id) {
      navigate("/cred-admin/students");
    }
  }, []);

  const handleAppprove = () => {};

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
              stats={StudentData?.application_status ? StudentData?.application_status : "Pending"}
              icon="fe-aperture"
              progress={StudentData?.current_stage == "0" ? 0 : StudentData?.current_stage == "1" ? 50 : 100}
              counterOptions={{
                prefix: "$",
              }}
            />
          </Col>

          <Col>
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
          </Col>
        </Col>

        <Col xl={8} lg={8}>
          <Tab.Container defaultActiveKey="preliminary_screening">
            <Card>
              <Card.Body>
                {/* <TimeLine /> */}
                {!StudentData?.status && (
                  <div className="d-flex w-100 justify-content-end mb-2">
                    <Button variant="success" size="sm" disabled={isLoading} onClick={handleAppprove}>
                      {isLoading ? "Loading…" : "Approve Student"}
                    </Button>
                  </div>
                )}
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
