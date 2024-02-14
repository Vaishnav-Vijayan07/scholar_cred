import React, { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";

import TicketDetails from "./TicketDetails";
import Discussion from "./Discussion";
import Attachments from "./Attachments";

// dummy data
import { ticketDetails } from "./data";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTicketComments,
  getTicketDetails,
} from "../../../redux/tickets/actions";
import { RootState } from "../../../redux/store";

const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { state, initialLoading, comments, status } = useSelector(
    (state: RootState) => ({
      state: state.Tickets.Ticket,
      initialLoading: state.Tickets.initialLoading,
      comments: state.Tickets.TicketComments,
      status: state.AdminTickets.adminTicketsStatus.data,
    })
  );

  useEffect(() => {
    dispatch(getTicketDetails(id));
    dispatch(getTicketComments(id));
  }, [id, dispatch]);

  if (initialLoading) {
    return (
      <Spinner
        animation="border"
        style={{ position: "absolute", top: "50%", left: "50%" }}
      />
    );
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Tickets", path: "/apps/tickets" },
          {
            label: "Ticket Detail",
            path: "/apps/tickets",
            active: true,
          },
        ]}
        title={"Ticket Detail"}
      />
      <Row>
        <Col>
          <TicketDetails state={state || []} ticket_id={id} />
          <Discussion comments={comments || []} ticket_id={id} />
        </Col>
      </Row>
    </>
  );
};

export default Details;
