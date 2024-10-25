import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Card, Form, Button, Modal, Spinner, Badge, Dropdown } from "react-bootstrap";

import { withSwal } from "react-sweetalert2";
import FeatherIcons from "feather-icons-react";
import Table from "../../components/Table";
import { RootState } from "../../redux/store";
import { getForexData } from "../../redux/Forex/actions";
import PageTitle from "../../components/PageTitle";
import { getInitData, updateInitData } from "../../redux/Forex/Initiations/actions";
import { Link } from "react-router-dom";
import Select from "react-select";

const statusOptions = [
  { value: "Initiated", label: "Initiated" },
  { value: "Accepted", label: "Accepted" },
];

const sizePerPageList = [
  {
    text: "5",
    value: 5,
  },
  {
    text: "10",
    value: 10,
  },
  {
    text: "20",
    value: 20,
  },
  {
    text: "50",
    value: 50,
  },
];

const BasicInputElements = withSwal((props: any) => {
  const { state, initialLoading, user } = props;
  const dispatch = useDispatch();

  const route_url = user == "CONSULTANT_STAFF" || user == "CONSULTANT_ADMIN" ? "/users/student-details-consultant/" : "/users/student-details/";

  const handleAssign = (student_id: string | number, status: string) => {
    dispatch(updateInitData("Initiated", student_id));
  };

  const columns = useMemo(
    () => [
      {
        Header: "Sl No",
        accessor: "",
        Cell: ({ row }: any) => <>{row.index + 1}</>,
        sort: false,
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }: any) => <>{`${row.original.first_name} ${row.original.last_name}`}</>,
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },

      {
        Header: "Action",
        accessor: "",
        sort: false,
        Cell: ({ row }: any) => (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <Button onClick={() => handleAssign(row.original.student_id, "Initiated")}>Initiate</Button>

            <Link to={`${route_url}${row.original.student_id}`}>
              <FeatherIcons icon="eye" size="15" className="cursor-pointer text-secondary" />
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  if (initialLoading) {
    return <Spinner animation="border" style={{ position: "absolute", top: "50%", left: "50%" }} />;
  }

  return (
    <>
      <Row className="justify-content-between px-2">
        <Col className="p-0 form__card">
          <Card className="bg-white">
            <Card.Body>
              <div className="d-flex float-end gap-2">{/* Additional buttons or actions */}</div>
              <Table
                columns={columns}
                data={state || []}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSearchable={true}
                theadClass="table-light mt-2"
                searchBoxClass="mt-2 mb-3"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
});

const ForexInitiations = () => {
  const dispatch = useDispatch();

  const { state, initialLoading, user } = useSelector((state: RootState) => ({
    state: state?.ForexInit.forexInitData,
    initialLoading: state?.ForexInit.initialLoading,
    user: state?.Auth.user,
  }));

  console.log(state);

  useEffect(() => {
    dispatch(getInitData());
  }, []);

  if (initialLoading) {
    return <Spinner animation="border" style={{ position: "absolute", top: "50%", left: "50%" }} />;
  }

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Forex", path: "" },
          {
            label: "Forex Initiations",
            path: "",
            active: true,
          },
        ]}
        title={"Forex Initiations"}
      />

      <Row>
        <Col>
          <BasicInputElements state={state} initialLoading={initialLoading} user={user.role_name} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ForexInitiations;
