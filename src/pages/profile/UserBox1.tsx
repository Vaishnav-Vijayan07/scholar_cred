import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import profileImg from "../../assets/images/avatar-logo.png";

const UserBox1 = ({ user }: any) => {

  return (
    <Card className="text-center">
      <Card.Body>
        <img
          src={user?.Avatar == "null" ? profileImg : `${process.env.REACT_APP_BACKEND_URL}${user.Avatar}`}
          className="rounded-circle avatar-lg img-thumbnail"
          alt="avatar"
          style={{ objectFit: "cover" }}
        />
        <h4 className="mb-0">{user?.full_name}</h4>
        <p className="text-muted">@{user?.username}</p>

        <div className="text-center mt-3 text-center">
          <h4 className="font-13 text-uppercase">About Me :</h4>

          <p className="text-muted mb-2 font-13">
            <strong>Full Name :</strong>
            <span className="ms-2">{user?.full_name}</span>
          </p>

          {/* <p className="text-muted mb-2 font-13">
            <strong>Mobile :</strong>
            <span className="ms-2">(123) 123 1234</span>
          </p> */}

          <p className="text-muted mb-2 font-13">
            <strong>Email :</strong>
            <span className="ms-2 ">{user?.email}</span>
          </p>

          <p className="text-muted mb-1 font-13">
            <strong>Role :</strong>
            <span className="ms-2">{user?.role_name}</span>
          </p>

          <p className="text-muted mb-1 font-13">
            <strong>Username :</strong>
            <span className="ms-2">{user?.username}</span>
          </p>
        </div>
        <ul className="social-list list-inline mt-3 mb-0">
          <li className="list-inline-item">
            <Link to="#" className="social-list-item border-primary text-primary">
              <i className="mdi mdi-facebook"></i>
            </Link>
          </li>
          <li className="list-inline-item">
            <Link to="#" className="social-list-item border-danger text-danger">
              <i className="mdi mdi-google"></i>
            </Link>
          </li>
          <li className="list-inline-item">
            <Link to="#" className="social-list-item border-info text-info">
              <i className="mdi mdi-twitter"></i>
            </Link>
          </li>
          <li className="list-inline-item">
            <Link to="#" className="social-list-item border-secondary text-secondary">
              <i className="mdi mdi-github"></i>
            </Link>
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
};

export default UserBox1;
