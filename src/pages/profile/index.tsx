import React from "react";
import { Row, Col, Card, Tab, Nav } from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";
import Messages from "../../components/Messages";

import UserBox from "./UserBox1";
import ChangePassword from "./ChangePassword";
import TimeLine from "./TimeLine1";
import Settings from "./Settings1";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Profile = () => {
  const { user, loading } = useSelector((state: RootState) => ({
    user: state.Auth.user,
    loading: state.Auth.loading,
  }));

  console.log("user==>", user);

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
          <UserBox user={user} />
        </Col>
        <Col xl={8} lg={8}>
          <Tab.Container defaultActiveKey="change_password">
            <Card>
              <Card.Body>
                <Nav variant="pills" as="ul" className="nav nav-pills nav-fill navtab-bg">
                  <Nav.Item as="li" className="nav-item">
                    <Nav.Link href="#" eventKey="change_password" className="nav-link cursor-pointer">
                      Change Password
                    </Nav.Link>
                  </Nav.Item>
                  {/* <Nav.Item as="li" className="nav-item">
                    <Nav.Link href="#" eventKey="timeline" className="nav-link cursor-pointer">
                      Timeline
                    </Nav.Link>
                  </Nav.Item> */}
                  <Nav.Item as="li" className="nav-item">
                    <Nav.Link href="#" eventKey="settings" className="nav-link cursor-pointer">
                      Settings
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="change_password">
                    <ChangePassword />
                  </Tab.Pane>
                  {/* <Tab.Pane eventKey="timeline">
                    <TimeLine />
                  </Tab.Pane> */}
                  <Tab.Pane eventKey="settings">
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
