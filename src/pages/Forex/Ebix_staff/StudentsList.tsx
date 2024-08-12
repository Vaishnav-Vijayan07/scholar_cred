import * as yup from "yup";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Alert,
  Spinner,
} from "react-bootstrap";
import Table from "../../../components/Table";
import { withSwal } from "react-sweetalert2";
import FeatherIcons from "feather-icons-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

// components
import PageTitle from "../../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
// import { createadminStaff, deleteAdminStaff, editAdminStaff, getAdminStaff } from "../../redux/adminStaffs/actions";
import { RootState } from "../../../redux/store";
import { sizePerPageList } from "../Super-admin/data";
import { getDocs } from "../../../redux/Ebix_staff/actions";
import DocsColumn from "./DocsColumn";

const BasicInputElements = withSwal((props: any) => {
  const { swal, loading, state, error, initialLoading } = props;
  const dispatch = useDispatch();

  //Table data
  const records = state;

  const handleDownloadZip = async (name: string, documents: any) => {
    const zip = new JSZip();
    console.log(documents);

    for (const doc of documents) {
      const urls = {
        passport_url: doc.passport_url,
        pan_card_url: doc.pan_card_url,
        offer_letter_url: doc.offer_letter_url,
        form_a2_url: doc.form_a2_url,
      };

      console.log(urls);

      return;

      for (const [key, url] of Object.entries(urls)) {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const filename = `${doc.full_name}_${key}.pdf`; // Customize filename as needed
          zip.file(filename, blob);
        } catch (error) {
          console.error(`Failed to download ${url}:`, error);
        }
      }
    }

    zip
      .generateAsync({ type: "blob" })
      .then((content) => {
        saveAs(content, "documents.zip");
      })
      .catch((error) => {
        console.error("Error generating zip:", error);
      });
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
      Header: "Forex Amount",
      accessor: "amount",
      sort: true,
    },
    {
      Header: "Buy Rate",
      accessor: "exchange_rate",
      sort: true,
    },
    {
      Header: "Docs",
      accessor: "",
      sort: true,
      Cell: ({ row }: any) => <DocsColumn row={row} />,
    },

    {
      Header: "Action",
      accessor: "",
      sort: true,
      Cell: ({ row }: any) => (
        <>
          <div className="d-flex flex-column gap-1 text-center align-items-center">
            <FeatherIcons
              icon="download"
              className="cursor-pointer text-primary"
              onClick={() => {
                const {
                  full_name,
                  passport_url,
                  pan_card_url,
                  offer_letter_url,
                  form_a2_url,
                } = row.original;

                handleDownloadZip(full_name, [
                  passport_url,
                  pan_card_url,
                  offer_letter_url,
                  form_a2_url,
                ]);
                // toggleResponsiveModal();
              }}
            />
            <p>Download All</p>
          </div>
        </>
      ),
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

  useEffect(() => {
    dispatch(getDocs());
  }, []);

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          {
            label: "Cred Admin Management",
            path: "/cred_admin/cred_user_management",
          },
          {
            label: "Cred Admin Users",
            path: "/cred_admin/cred_user_management",
            active: true,
          },
        ]}
        title={"Cred Admin Management"}
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
