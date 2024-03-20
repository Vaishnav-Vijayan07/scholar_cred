import React, { useEffect, useState } from "react";
import { Row, Col, Card, Tab, Nav } from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";
import UserBox from "./UserBox1";
import ChangePassword from "./ChangePassword";
import Settings from "./Settings1";
import {useSelector } from "react-redux";
import axios from "axios";
import { getUserFromCookie } from "../../helpers/api/apiCore";

const Profile = () => {
  const refreshing = useSelector(
    (state: any) => state.refreshReducer.refreshing
  );
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { user_id } = getUserFromCookie();
    (async () => {
      try {
        const response = await axios.get(`admin_users_by_userid?id=${user_id}`);
        const result = response.data.data;
        setUser(result);
      } catch (error) {
        console.error("Error fetching personal info:", error);
      }
      setLoading(false);
    })();
  }, [refreshing]);


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
          <UserBox user={user || []} loading={loading} />
        </Col>
        <Col xl={8} lg={8}>
          <Tab.Container defaultActiveKey="change_password">
            <Card>
              <Card.Body>
                <Nav
                  variant="pills"
                  as="ul"
                  className="nav nav-pills nav-fill navtab-bg"
                >
                  <Nav.Item as="li" className="nav-item">
                    <Nav.Link
                      href="#"
                      eventKey="change_password"
                      className="nav-link cursor-pointer"
                    >
                      Change Password
                    </Nav.Link>
                  </Nav.Item>
                  {/* <Nav.Item as="li" className="nav-item">
                    <Nav.Link href="#" eventKey="timeline" className="nav-link cursor-pointer">
                      Timeline
                    </Nav.Link>
                  </Nav.Item> */}
                  <Nav.Item as="li" className="nav-item">
                    <Nav.Link
                      href="#"
                      eventKey="settings"
                      className="nav-link cursor-pointer"
                    >
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
