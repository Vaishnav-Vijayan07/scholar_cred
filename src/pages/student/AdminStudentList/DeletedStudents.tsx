import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getStudent } from "../../../redux/actions";
import BasicInputElements from "./BasicInputElements";
import { useLocation } from "react-router-dom";

const DeletedStudents = () => {
  const dispatch = useDispatch();

  const { pathname: path } = useLocation();

  const { state, loading, error, initialLoading } = useSelector((state: RootState) => ({
    state: state.Students.deletedStudents,
    loading: state?.Students.loading,
    error: state?.Students.error,
    initialLoading: state?.Students.initialLoading,
  }));

  useEffect(() => {
    dispatch(getStudent(1));
  }, []);

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Student Management", path: "/cred-admin/deleted-students" },
          {
            label: "Deleted Students",
            path: "/cred-admin/deleted-students",
            active: true,
          },
        ]}
        title={"Student Management"}
      />
      <Row>
        <Col>
          <BasicInputElements path={path} state={state} loading={loading} error={error} initialLoading={initialLoading} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DeletedStudents;
