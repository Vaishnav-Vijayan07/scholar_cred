import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import Table from "../../../components/Table";
import { withSwal } from "react-sweetalert2";
import FeatherIcons from "feather-icons-react";

// components
import PageTitle from "../../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { sizePerPageList } from "../Super-admin/data";
import { getSwiftDocs } from "../../../redux/Ebix_staff/actions";
import axios from "axios";
import { Link } from "react-router-dom";

const BasicInputElements = withSwal((props: any) => {
  const { swal, loading, state, error, initialLoading } = props;

  //Table data
  const records = state;

  //handling update logic

  const columns = [
    {
      Header: "Sl No",
      accessor: "slNo",
      Cell: ({ row }: any) => <>{row.index + 1}</>, // Use row.index to get the row number
      sort: false,
    },
    {
      Header: "Name",
      accessor: "full_name",
      sort: true,
    },
    {
      Header: "Email",
      accessor: "email",
      sort: true,
    },
    {
      Header: "Phone",
      accessor: "phone",
      sort: true,
    },
    {
      Header: "University",
      accessor: "university_name",
      sort: true,
    },
    {
      Header: "Swift Copy",
      accessor: "",
      sort: true,
      Cell: ({ row }: any) => {
        return (
          <Link to={row.original.swift_url} className="btn btn-primary btn-sm">
            <FeatherIcons icon="file-text" />
          </Link>
        );
      },
    },

    {
      Header: "Action",
      accessor: "",
      sort: true,
      Cell: ({ row }: any) => {
        return (
          <>
            <div className="d-flex justify-content-center">
              <Link
                to={`/ebix_staff/students/${row.original.forex_data_id}`}
                state={row.original.forex_data_id}
              >
                <FeatherIcons
                  icon="eye"
                  size="15"
                  className="cursor-pointer text-secondary"
                />
              </Link>
            </div>
          </>
        );
      },
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
                {/* <h4 className="header-title mb-4">Manage Cred Admin</h4> */}
                <Table
                  columns={columns}
                  data={records ? records : []}
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

const SwiftCopyList = () => {
  const dispatch = useDispatch();

  const { state, loading, error, initialLoading } = useSelector(
    (state: RootState) => ({
      state: state.EbixStaffReducer.swiftCopies,
      loading: state?.EbixStaffReducer.loading,
      error: state?.EbixStaffReducer?.error,
      initialLoading: state?.EbixStaffReducer?.initialLoading,
    })
  );

  useEffect(() => {
    dispatch(getSwiftDocs());
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
          {
            label: "Swift Copies",
            path: "/ebix_staff/students_list",
          },
          {
            label: "Copies",
            path: "",
            active: true,
          },
        ]}
        title={"Swift Copies"}
      />
      <Row>
        <Col>
          <BasicInputElements
            state={state}
            loading={loading}
            error={error}
            initialLoading={initialLoading}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default SwiftCopyList;
