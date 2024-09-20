import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import UploadBox from "./UploadBox";
import Breakdowns from "./Breakdowns";
import { useDispatch, useSelector } from "react-redux";
import { getPayDetails } from "../../../redux/Ebix_staff/actions";
import { RootState } from "../../../redux/store";

const StudentDetails = () => {
  const { id: forex_id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (forex_id) {
      dispatch(getPayDetails(forex_id));
    }
  }, []);

  const { state, loading, error, initialLoading } = useSelector(
    (state: RootState) => ({
      state: state.EbixStaffReducer.payDetails,
      loading: state?.EbixStaffReducer.loading,
      error: state?.EbixStaffReducer?.error,
      initialLoading: state?.EbixStaffReducer?.initialLoading,
    })
  );

  if (initialLoading) {
    return (
      <Spinner
        animation="border"
        style={{ position: "absolute", top: "50%", left: "50%" }}
      />
    );
  }

  console.log(state);
  

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: "Students",
            path: "",
          },

          { label: "Details", path: "", active: true },
        ]}
        title={"Profile"}
      />
      <Row>
        <Col xl={4} lg={4}>
          <UploadBox
            student_id={state?.student_id}
            forex_id={state?.forex_id}
            swift_url={state?.swift_url}
            first_name={state?.first_name}
            last_name={state?.last_name}
            paid_to={state?.paid_to}
            email={state?.email}
            status = {state?.orderstatus}
            error={error || ""}
            loading={loading}
          />
        </Col>

        <Col xl={8} lg={8}>
          <Row>
            <Card>
              <Card.Body>
                <Breakdowns state={state || []} />
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default StudentDetails;
