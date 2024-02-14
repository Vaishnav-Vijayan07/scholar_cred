import React, { useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";

import Statistics from "./Statistics";
import ManageTickets from "./ManageTickets";

// dummy data
import { getStatusProperties, ticketDetails } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { getAdminTicketsCount } from "../../../redux/actions";
import { RootState } from "../../../redux/store";

const List = () => {
  const dispatch = useDispatch();

  const { state } = useSelector((state: RootState) => ({
    state: state?.AdminTickets?.adminTicketsCount?.data || [],
  }));

  useEffect(() => {
    dispatch(getAdminTicketsCount());
  }, []);

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Tickets", path: "/apps/tickets" },
          { label: "Ticket List", path: "/apps/tickets", active: true },
        ]}
        title={"Ticket List"}
      />
      <Row>
        {state.map((item: any) => (
          <Col md={6} xl={3}>
            <Statistics
              icon={getStatusProperties(item.status_name).icon}
              variant={getStatusProperties(item.status_name).variant}
              stats={item.status_count}
              desc={item.status_name}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          {/* <ManageTickets ticketDetails={ticketDetails} /> */}
        </Col>
      </Row>
    </>
  );
};

export default List;
