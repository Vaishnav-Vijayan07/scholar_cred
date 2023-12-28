import React, { useEffect, useState } from "react";
import { Row, Col, Card, Tab, Nav } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";
import Messages from "../../../components/Messages";

import UserBox from "./UserBox";
import About from "./About";
import TimeLine from "./TimeLine";
import Settings from "./Settings";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentById } from "../../../redux/actions";
import { RootState } from "../../../redux/store";

interface ProjectDetails {
  id: number;
  client: string;
  name: string;
  startDate: string;
  dueDate: string;
  status: string;
}

const Profile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [preliminaryDetails, setPreliminaryDetails] = useState({});

  const { StudentData } = useSelector((state: RootState) => ({
    StudentData: state.Students.studentById,
  }));

  const methods = useForm();
  const {
    register,
    control,
    formState: { errors },
  } = methods;

  const getPrilimineryDetailsApi = () => {
    axios
      .post("getPrilimineryDetails", { student_id: location?.state })
      .then((res) => {
        console.log("res--->", res.data);
        setPreliminaryDetails(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStudentDetails = () => {
    dispatch(getStudentById(location?.state));
  };

  useEffect(() => {
    getPrilimineryDetailsApi();
    getStudentDetails();
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
          <UserBox StudentData={StudentData} />
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
                    <Nav.Link href="#" eventKey="history" className="nav-link cursor-pointer">
                      History
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="preliminary_screening">
                    {/* <About projectDetails={projectDetails} /> */}
                    <About register={register} errors={errors} control={control} preliminaryDetails={preliminaryDetails} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="detail_screening">
                    <TimeLine register={register} errors={errors} control={control} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="history">
                    <Settings />
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
