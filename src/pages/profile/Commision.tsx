import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Row, Col, InputGroup, Form } from "react-bootstrap";

// components
import { FormInput } from "../../components/";
import { useDispatch, useSelector } from "react-redux";

import { editProfile } from "../../redux/actions";
import axios from "axios";
import { getUserFromCookie } from "../../helpers/api/apiCore";
import { showSuccessAlert } from "../../constants/alerts";
import { refreshData } from "../../reducer/refreshReducer";

const PersonalInfo = ({ currentCommision }: any) => {
  const [commision, setCommision] = useState("");
  const [errMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => ({
    refreshing: state.refreshReducer.refreshing,
    user: state.Auth.user,
  }));

  const handleInputChange = (e: any) => {
    setErrorMsg("");
    const { value } = e.target;

    setCommision(value);
  };

  const handle = async () => {
    if (commision === "") {
      setErrorMsg("Please enter commision");
      return;
    }
    if (parseInt(commision) < 0) {
      setErrorMsg("Entered commision is not valid");
      return;
    }
    try {
      const { data } = await axios.patch("/forex/update-commision", {
        commision,
        user,
      });
      dispatch(refreshData());
      showSuccessAlert(data.message);
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };
  return (
    <>
      <h5 className="mb-4 text-uppercase">
        <i className="mdi mdi-account-circle me-1"></i> Makeup Amount
      </h5>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="old_password">
              <Form.Label>Makeup amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your amount eg: 590.23"
                name="commision"
                value={commision}
                onChange={handleInputChange}
              />
              {errMsg && (
                <Form.Text className="text-danger">{errMsg}</Form.Text>
              )}
            </Form.Group>
            <Form.Text className="text-danger">
              {user?.role_name === "CRED_ADMIN" ? (
                <>Current Amount :{currentCommision?.amount}</>
              ) : (
                <>Current Amount :{currentCommision?.commisionamount}</>
              )}
            </Form.Text>
          </Col>
        </Row>

        <div className="text-end">
          <button
            type="button"
            onClick={handle}
            className="btn btn-success mt-2"
          >
            <i className="mdi mdi-content-save"></i> Save
          </button>
        </div>
      </Form>
    </>
  );
};

const Commision = ({ user }: any) => {
  return (
    <>
      <form>
        <PersonalInfo currentCommision={user} />
      </form>
    </>
  );
};

export default Commision;
