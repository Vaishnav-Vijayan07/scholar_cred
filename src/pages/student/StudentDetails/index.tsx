import React, { useEffect, useState } from "react";
import { Row, Col, Card, Tab, Nav } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";

import UserBox from "./UserBox";
import PreliminaryScreening from "./PreliminaryScreening";
import History from "./History";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentById } from "../../../redux/actions";
import { RootState } from "../../../redux/store";
import StatisticsWidget2 from "../../../components/StatisticsWidget2";
import DetailedScreening from "./DetailedScreening";
import DocsScreening from "./DocsScreening";

interface ProjectDetails {
  id: number;
  client: string;
  name: string;
  startDate: string;
  dueDate: string;
  status: string;
}

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preliminaryDetails, setPreliminaryDetails] = useState({});
  const [preliminaryLoading, setPreliminaryLoading] = useState(false);

  const { StudentData, loading } = useSelector((state: RootState) => ({
    StudentData: state.Students.studentById,
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

  useEffect(() => {
    getPrilimineryDetailsApi();
    getStudentDetails();
  }, []);

  useEffect(() => {
    if (!id) {
      navigate("/cred-admin/students");
    }
  }, []);

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
        </Col>

        <Col xl={8} lg={8}>
          <Tab.Container defaultActiveKey="preliminary_screening">
            <Card>
              <Card.Body>
                <Nav variant="pills" as="ul" className="nav nav-pills nav-fill navtab-bg">
                  <Nav.Item as="li" className="nav-item">
                    <Nav.Link href="#" eventKey="preliminary_screening" className="nav-link cursor-pointer">
                      Preliminary screening
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item as="li" className="nav-item">
                    <Nav.Link href="#" eventKey="detail_screening" className="nav-link cursor-pointer">
                      Detail Screening
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item as="li" className="nav-item">
                    <Nav.Link href="#" eventKey="document_screening" className="nav-link cursor-pointer">
                      Docs screening
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item as="li" className="nav-item">
                    <Nav.Link href="#" eventKey="history" className="nav-link cursor-pointer">
                      History
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="preliminary_screening">
                    {/* <About projectDetails={projectDetails} /> */}
                    <PreliminaryScreening register={register} errors={errors} control={control} preliminaryDetails={preliminaryDetails} preliminaryLoading={preliminaryLoading} />
                  </Tab.Pane>

                  <Tab.Pane eventKey="detail_screening">
                    <DetailedScreening student_id={id} StudentData={StudentData} />
                  </Tab.Pane>

                  <Tab.Pane eventKey="document_screening">
                    <DocsScreening />
                  </Tab.Pane>

                  <Tab.Pane eventKey="history">
                    <History />
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
