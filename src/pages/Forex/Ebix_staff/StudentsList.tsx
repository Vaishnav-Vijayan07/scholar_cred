import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import Table from "../../../components/Table";
import { withSwal } from "react-sweetalert2";
import FeatherIcons from "feather-icons-react";

// components
import PageTitle from "../../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
// import { createadminStaff, deleteAdminStaff, editAdminStaff, getAdminStaff } from "../../redux/adminStaffs/actions";
import { RootState } from "../../../redux/store";
import { sizePerPageList } from "../Super-admin/data";
import { getDocs } from "../../../redux/Ebix_staff/actions";
import DocsColumn from "./DocsColumn";
import axios from "axios";
import { Link } from "react-router-dom";

const BasicInputElements = withSwal((props: any) => {
  const { swal, loading, state, error, initialLoading } = props;
  const dispatch = useDispatch();

  const [downloading, setDownloading] = useState<{ [key: number]: boolean }>(
    {}
  );

  //Table data
  const records = state;

  const handleDownload = async (
    full_name: string,
    documents: any,
    rowIndex: any
  ) => {
    setDownloading((prevState) => ({ ...prevState, [rowIndex]: true }));
    const ImageUrls = {
      passport_url: documents.passport_url,
      pan_card_url: documents.pan_card_url,
      offer_letter_url: documents.offer_letter_url,
      form_a2_url: documents.form_a2_url,
    };

    try {
      const response = await axios.post(
        "/download-pdf",
        { ImageUrls },
        {
          responseType: "blob",
        }
      );

      // Create a link element
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${full_name}.zip`); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading files:", error);
    } finally {
      setDownloading((prevState) => ({ ...prevState, [rowIndex]: false }));
    }
  };

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
      Header: "Docs",
      accessor: "",
      sort: true,
      Cell: ({ row }: any) => {
        const rowIndex = row.index;
        return (
          <>
            <div className="d-flex justify-content-center">
              <div>
                <DocsColumn row={row} />,
              </div>
              {downloading[rowIndex] ? (
                <Spinner animation="border" />
              ) : (
                <div className="d-flex justify-content-center flex-column align-items-center">
                  <FeatherIcons
                    icon="download"
                    className="cursor-pointer text-primary"
                    onClick={() => {
                      const { full_name } = row.original;
                      handleDownload(full_name, row.original, rowIndex);
                    }}
                  />
                  <p>Download All</p>
                </div>
              )}
            </div>
          </>
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

const StudentsList = () => {
  const dispatch = useDispatch();

  const { state, loading, error, initialLoading } = useSelector(
    (state: RootState) => ({
      state: state.EbixStaffReducer.ebixDocs,
      loading: state?.EbixStaffReducer.loading,
      error: state?.EbixStaffReducer?.error,
      initialLoading: state?.EbixStaffReducer?.initialLoading,
    })
  );

  console.log(initialLoading);

  useEffect(() => {
    dispatch(getDocs());
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
            label: "Order Docs Management",
            path: "/ebix_staff/students_list",
          },
          {
            label: "Order Items",
            path: "",
            active: true,
          },
        ]}
        title={"Order Docs Management"}
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
export default StudentsList;
