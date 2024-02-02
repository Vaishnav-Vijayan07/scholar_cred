import React, { useEffect, useState } from "react";
import { Row, Col, Card, Tab, Nav, ProgressBar, Dropdown } from "react-bootstrap";

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
import classNames from "classnames";
import { showErrorAlert, showSuccessAlert } from "../../../constants/alerts";

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
  const [loanStatus, setLoanStatus] = useState([]);

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

  const getLoanStatus = () => {
    axios
      .get("loanStatus")
      .then((res) => {
        console.log("res ==>", res.data);
        setLoanStatus(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPrilimineryDetailsApi();
    dispatch(getStudentById(id ? id : ""));
    getLoanStatus();
  }, []);

  useEffect(() => {
    if (!id) {
      navigate("/cred-admin/students");
    }
  }, []);

  const handleChangeStatus = (status_id: string) => {
    axios
      .post(`update_status/${id}`, { loan_status_id: status_id })
      .then((res) => {
        console.log("res", res);
        showSuccessAlert("Status changed successfully");
        dispatch(getStudentById(id ? id : ""));
      })
      .catch((err) => {
        console.log(err);
        showErrorAlert("Something went wrong..");
      });
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
              stats={StudentData?.status_name ? StudentData?.status_name : StudentData?.application_status || "Pending"}
              icon="fe-aperture"
              progress={StudentData?.current_stage == "0" ? 0 : StudentData?.current_stage == "1" ? 50 : 100}
              counterOptions={{
                prefix: "$",
              }}
            />
          </Col>

          {/* Loan status */}
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col className="col-2">
                    <div className={classNames("avatar-sm", "rounded", "bg-" + "success")}>
                      <i className={classNames("fe-refresh-cw", "avatar-title font-22 text-white")}></i>
                    </div>
                  </Col>
                  <Col className="col-10">
                    <div className="text-end">
                      <h4 className="text-dark my-1">
                        <span>{StudentData?.loan_status_name || StudentData?.loan_status || "Pending"}</span>
                      </h4>
                      <p className="text-muted mb-1 text-truncate">{"Loan status"}</p>
                    </div>
                  </Col>
                </Row>
                <div className="mt-3">
                  <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle className="cursor-pointer" variant="light">
                      Change status
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {loanStatus?.map((item: any) => (
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
