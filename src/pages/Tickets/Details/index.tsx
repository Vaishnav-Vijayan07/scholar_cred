import React, { useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";

import TicketDetails from "./TicketDetails";
import Discussion from "./Discussion";


// dummy data

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTicketComments,
  getTicketDetails,
} from "../../../redux/tickets/actions";
import { RootState } from "../../../redux/store";

const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();


  const { state, initialLoading, comments, user } = useSelector(
    (state: RootState) => ({
      state: state.Tickets.Ticket,
      user: state.Auth.user,
      initialLoading: state.Tickets.initialLoading,
      comments: state.Tickets.TicketComments,
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
        {/* <Col md={6} >
        </Col>
        <Col md={6} >
      </Col> */}
        <Col>
          <TicketDetails state={state || []} ticket_id={id} />
          
            <Discussion
              comments={comments || []}
              ticket_id={id || ""}
              user={user}
            />
        </Col>
      </Row>
    </>
  );
};

export default Details;
