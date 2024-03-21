import React, { useEffect, useState } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import avatarImg from "../../../assets/images/avatar-logo.png";
import { Link } from "react-router-dom";

// dummy data
import { TicketDetailsTypes, getStatusId } from "./data";
import moment from "moment";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminTicketStatus,
  updateAdminTicketStatus,
} from "../../../redux/actions";
import { RootState } from "../../../redux/store";

interface TicketDetailsProps {
  ticketDetails: TicketDetailsTypes;
}

const TicketDetails = ({ state, ticket_id }: any) => {
  const [options, setOptions] = useState(state[0]?.status_name);

  const { status, user } = useSelector((state: RootState) => ({
    status: state.AdminTickets.adminTicketsStatus.data,
    user: state.Auth.user,
  }));

  useEffect(() => {
    dispatch(getAdminTicketStatus());
  }, []);

  useEffect(() => {
    setOptions(state[0]?.status_name);
  }, [state[0]?.status_name]);

  const dispatch = useDispatch();

  const handleChange = (status: any) => {
    const status_id = getStatusId(status);
    dispatch(updateAdminTicketStatus(status_id, ticket_id));
  };

  return (
    <>
      <Card className="d-block">
        <Card.Body>
          <div className="clerfix"></div>

          <Row>
            <Col md={4}>
              <label className="mt-2 mb-1">Ticket Type :</label>
              <p>
                <i className="mdi mdi-ticket font-18 text-success me-1 align-middle"></i>{" "}
                {state[0]?.subject_name}
              </p>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <label className="mt-2 mb-1">Reported By :</label>
              <div className="d-flex align-items-start">
                <div className="circle">
                  <p className="circle-inner object-fit-contain">
                    {state[0]?.student_first_name[0].toUpperCase()}
                  </p>
                </div>
                <div className="w-100">
                  <p>{`${state[0]?.student_first_name} ${state[0]?.student_last_name}`}</p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <label className="mt-2 mb-1">Assigned To :</label>
              <div className="d-flex align-items-start ">
                <div className="circle">
                  <p className="circle-inner object-fit-contain">
                    {state[0]?.assigned_to_user_name[0].toUpperCase()}
                  </p>
                </div>
                <div className="w-100">
                  <p> {state[0]?.assigned_to_user_name} </p>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <label className="mt-2 mb-1">Created On :</label>
              <p>{moment(state[0]?.ticket_created_at).format("YYYY-MM-DD")} </p>
            </Col>
            <Col md={6}>
              <label className="mt-2 mb-1">Updated On :</label>
              <p>{moment(state[0]?.ticket_updated_at).format("YYYY-MM-DD")} </p>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <label className="mt-2 form-label">Status :</label>
              <div className="row">
                <div className="col-auto">
                  <select
                    className="form-select form-select-sm"
                    value={options}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      setOptions(selectedValue);
                      handleChange(selectedValue);
                    }}
                    disabled={
                      options === "Closed" || (user.role >= 3 && user.role <= 7)
                    }
                  >
                    {status?.map((item: any) => (
                      <option key={item.ticketstatus} value={item.status_name}>
                        {item.ticketstatus}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <label className="mt-2 mb-1">Priority :</label>
              <div className="row">
                <div className="col-auto">
                  <div className=" d-flex" style={{ width: 100 }}>
                    {state[0]?.subject_priority}
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <label className="mt-4 mb-1">Overview :</label>
          <p className="text-muted mb-0">{state[0]?.subjects_description}</p>
        </Card.Body>
      </Card>
    </>
  );
};

export default TicketDetails;
