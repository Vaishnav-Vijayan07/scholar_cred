import React, { useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getConsultants } from "../../../redux/actions";
import { RootState } from "../../../redux/store";
import PageTitle from "../../../components/PageTitle";

import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Alert,
  Spinner,
  Badge,
} from "react-bootstrap";
import Table from "../../../components/Table";
import { withSwal } from "react-sweetalert2";
import axios from "axios";
import { showSuccessAlert } from "../../../constants/alerts";
import { getCommisions, getForexData } from "../../../redux/Forex/actions";
import CommisionsData from "./CommisionsData";

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

// import { CustomCropper } from "./CustomCropper";

const BasicInputElements = withSwal((props: any) => {
  const dispatch = useDispatch();
  const { swal, loading, state, error, success, initialLoading, user } = props;
  const [modal, setModal] = useState<boolean>(false);

  const toggle = () => {
    setModal(!modal);
  };

  //Input data

  const columns = [
    {
      Header: "Sl No",
      accessor: "",
      Cell: ({ row }: any) => <>{row.index + 1}</>, // Use row.index to get the row number
      sort: false,
    },
    {
      Header: "Student",
      accessor: "student_name",
      Cell: ({ row }: any) => (
        <>
          <span>{`${row.original.first_name} ${row.original.last_name}`}</span>
        </>
      ),
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Paid to",
      accessor: "paid_to",
    },
    {
      Header: "Commission",
      accessor: "commision",
    },
    {
      Header: "Forex Amount",
      accessor: "declaration_amount",
    },
    {
      Header: "Buy Rate",
      accessor: "exchange_rate",
    },
    {
      Header: "Sub Total",
      accessor: "sub_total",
    },
    {
      Header: "Amount Paid",
      accessor: "amount_payable",
    },
  ];

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
      <>
        <Row className="justify-content-between px-2">
          <Col className="p-0 form__card">
            <Card className="bg-white">
              <Card.Body>
                <Table
                  columns={columns}
                  data={state ? state : []}
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
    </>
  );
});

const ConsultantCommisons = () => {
  const dispatch = useDispatch();

  const { state, loading, error, success, initialLoading, user } = useSelector(
    (state: RootState) => ({
      state: state?.Forex.commisions,
      loading: state?.Forex.loading,
      error: state?.Forex.error,
      success: state?.Forex.success,
      initialLoading: state?.Forex.initialLoading,
      user: state?.Auth?.user,
    })
  );

  useEffect(() => {
    dispatch(getCommisions());
  }, []);

  if (initialLoading) {
    return (
      <Spinner
        animation="border"
        style={{ position: "absolute", top: "50%", left: "50%" }}
      />
    );
  }

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Forex", path: "/users/consultant" },
          {
            label: "Transactions",
            path: "/forex/transaction",
            active: true,
          },
        ]}
        title={"Commissions"}
      />
      <Row>
        <Col>
          <BasicInputElements
            state={state}
            loading={loading}
            error={error}
            success={success}
            initialLoading={initialLoading}
            user={user}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ConsultantCommisons;
