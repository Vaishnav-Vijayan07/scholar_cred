import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import PageTitle from "../../../components/PageTitle";

import { Row, Col, Card, Spinner, Badge } from "react-bootstrap";
import Table from "../../../components/Table";
import { withSwal } from "react-sweetalert2";
import { getCommisions } from "../../../redux/Forex/actions";
import { getInrType } from "../../../helpers/currencyConverter";

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
  const { state, initialLoading } = props;

  const columns = [
    {
      Header: "Sl No",
      accessor: "",
      Cell: ({ row }: any) => <>{row.index + 1}</>,
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
      Header: "Consultant",
      accessor: "consultant",
    },
    {
      Header: "Commission",
      accessor: "commision",
      Cell: ({ row }: any) => <>{getInrType(row?.original?.commision)}</>,
    },
    {
      Header: "Consultant Commision",
      accessor: "",
      Cell: ({ row }: any) => (
        <>{getInrType(row?.original?.consultant_commision)}</>
      ),
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
      accessor: "",
      Cell: ({ row }: any) => <>{getInrType(row?.original?.sub_total)}</>,
    },
    {
      Header: "Amount Paid",
      accessor: "",
      Cell: ({ row }: any) => <>{getInrType(row?.original?.amount_payable)}</>,
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

const AdminCommisons = () => {
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

export default AdminCommisons;
