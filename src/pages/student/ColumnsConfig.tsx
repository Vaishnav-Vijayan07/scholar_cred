import React, { ReactNode } from "react";
import moment from "moment";
import { Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import FeatherIcons from "feather-icons-react";

export const getColumns = (handleResetPassword: any, resetPassword: any, handleUpdate: any, toggleResponsiveModal: any, handleDelete: any) => {
  return [
    {
      Header: "ID",
      accessor: "student_id",
      sort: true,
    },
    {
      Header: "Name",
      accessor: "first_name",
      sort: true,
      Cell: ({ row }: any) => <span>{row.original.first_name + " " + row.original.last_name}</span>,
    },
    {
      Header: "Country",
      accessor: "country_of_origin",
      sort: false,
    },
    {
      Header: "Intake Month",
      accessor: "intake_month",
      sort: false,
      Cell: ({ row }: any) => <span>{moment(row.original.created_at).format("LL")?.split(" ")[0]}</span>,
    },
    {
      Header: "Application Status",
      accessor: "application_status",
      sort: false,
      Cell: ({ row }: any) => (
        <Badge bg="" className="badge-soft-success text-wrap py-1">
          {row.original?.application_status}
        </Badge>
      ),
    },
    {
      Header: "Loan Status",
      accessor: "loan_status",
      sort: false,
      Cell: ({ row }: any) => (
        <Badge bg="" className="badge-soft-primary text-wrap py-1">
          {row.original?.loan_status}
        </Badge>
      ),
    },
    {
      Header: "Created By",
      accessor: "created_user",
      sort: false,
    },
    {
      Header: "Assigned Staff",
      accessor: "assigned_staff",
      sort: false,
    },
    // {
    //   Header: "Send Password",
    //   accessor: "",
    //   sort: false,
    //   Cell: ({ row }: any) => (
    //     <div className="d-flex gap-1 justify-content-center align-items-center cursor-pointer">
    //       <Button
    //         variant="link"
    //         onClick={() => {
    //           Swal.fire({
    //             title: "Are you sure you want to change the password?",
    //             text: "This action cannot be undone.",
    //             icon: "warning",
    //             showCancelButton: true,
    //             confirmButtonColor: "#3085d6",
    //             cancelButtonColor: "#d33",
    //             confirmButtonText: "Yes, Send it!",
    //           }).then((result: any) => {
    //             if (result.isConfirmed) {
    //               handleResetPassword(row.original.email);
    //             }
    //           });
    //         }}
    //       >
    //         {/* <FeatherIcons icon="mail" size="14" className="cursor-pointer text-secondary me-1" /> */}
    //         Send Mail
    //       </Button>
    //     </div>
    //   ),
    // },
    {
      Header: "Actions",
      accessor: "",
      sort: false,
      Cell: ({ row }: any) => (
        <div className="d-flex justify-content-center align-items-center gap-2">
          {/* Edit Icon */}
          <div className="d-flex justify-content-center align-items-center gap-2">
            {/* Delete Icon */}
            <Link to={`/users/student-details-consultant/${row.original.student_id}`} state={row.original.student_id}>
              <FeatherIcons icon="eye" size="15" className="cursor-pointer text-secondary" />
            </Link>
          </div>
          <FeatherIcons
            icon="edit"
            size="15"
            className="cursor-pointer text-secondary"
            onClick={() => {
              handleUpdate(row.original);
              toggleResponsiveModal();
            }}
          />

          {/* Delete Icon */}
          <FeatherIcons icon="trash-2" size="15" className="cursor-pointer text-secondary" onClick={() => handleDelete(row.original.student_id)} />
        </div>
      ),
    },
  ];
};

export const getConsultantStaffColumns = (handleResetPassword: any, resetPassword: any, handleUpdate: any, toggleResponsiveModal: any, handleDelete: any) => {
  return [
    {
      Header: "ID",
      accessor: "student_id",
      sort: true,
    },
    {
      Header: "Name",
      accessor: "first_name",
      sort: true,
      Cell: ({ row }: any) => <span>{row.original.first_name + " " + row.original.last_name}</span>,
    },
    {
      Header: "Country",
      accessor: "country_of_origin",
      sort: false,
    },
    {
      Header: "Intake Month",
      accessor: "intake_month",
      sort: false,
      Cell: ({ row }: any) => <span>{moment(row.original.created_at).format("LL")?.split(" ")[0]}</span>,
    },
    {
      Header: "Application Status",
      accessor: "application_status",
      sort: false,
      Cell: ({ row }: any) => (
        <Badge bg="" className="badge-soft-success text-wrap py-1">
          {row.original?.application_status}
        </Badge>
      ),
    },
    {
      Header: "Loan Status",
      accessor: "loan_status",
      sort: false,
      Cell: ({ row }: any) => (
        <Badge bg="" className="badge-soft-primary text-wrap py-1">
          {row.original?.loan_status}
        </Badge>
      ),
    },
    // {
    //   Header: "Send Password",
    //   accessor: "",
    //   sort: false,
    //   Cell: ({ row }: any) => (
    //     <div className="d-flex gap-1 justify-content-center align-items-center cursor-pointer">
    //       <Button
    //         variant="link"
    //         onClick={() => {
    //           Swal.fire({
    //             title: "Are you sure you want to change the password?",
    //             text: "This action cannot be undone.",
    //             icon: "warning",
    //             showCancelButton: true,
    //             confirmButtonColor: "#3085d6",
    //             cancelButtonColor: "#d33",
    //             confirmButtonText: "Yes, Send it!",
    //           }).then((result: any) => {
    //             if (result.isConfirmed) {
    //               handleResetPassword(row.original.email);
    //             }
    //           });
    //         }}
    //       >
    //         {/* <FeatherIcons icon="mail" size="14" className="cursor-pointer text-secondary me-1" /> */}
    //         Send Mail
    //       </Button>
    //     </div>
    //   ),
    // },
    {
      Header: "Actions",
      accessor: "",
      sort: false,
      Cell: ({ row }: any) => (
        <div className="d-flex justify-content-center align-items-center gap-2">
          {/* Edit Icon */}
          <div className="d-flex justify-content-center align-items-center gap-2">
            {/* Delete Icon */}
            <Link to={`/users/student-details-consultant/${row.original.student_id}`} state={row.original.student_id}>
              <FeatherIcons icon="eye" size="15" className="cursor-pointer text-secondary" />
            </Link>
          </div>
          <FeatherIcons
            icon="edit"
            size="15"
            className="cursor-pointer text-secondary"
            onClick={() => {
              handleUpdate(row.original);
              toggleResponsiveModal();
            }}
          />

          {/* Delete Icon */}
          <FeatherIcons icon="trash-2" size="15" className="cursor-pointer text-secondary" onClick={() => handleDelete(row.original.student_id)} />
        </div>
      ),
    },
  ];
};

export const getCredStaffColumns = (handleUpdate: any, toggleResponsiveModal: any, handleDelete: any) => {
  return [
    {
      Header: "ID",
      accessor: "student_id",
      sort: true,
    },
    {
      Header: "Name",
      accessor: "first_name",
      sort: true,
      Cell: ({ row }: any) => <span>{row.original.first_name + " " + row.original.last_name}</span>,
    },
    {
      Header: "Country",
      accessor: "country_of_origin",
      sort: false,
    },
    {
      Header: "Intake Month",
      accessor: "intake_month",
      sort: false,
      Cell: ({ row }: any) => <span>{moment(row.original.created_at).format("LL")?.split(" ")[0]}</span>,
    },
    {
      Header: "Application Status",
      accessor: "application_status",
      sort: false,
      Cell: ({ row }: any) => (
        <Badge bg="" className="badge-soft-success text-wrap py-1">
          {row.original?.application_status}
        </Badge>
      ),
    },
    {
      Header: "Loan Status",
      accessor: "loan_status",
      sort: false,
      Cell: ({ row }: any) => (
        <Badge bg="" className="badge-soft-primary text-wrap py-1">
          {row.original?.loan_status}
        </Badge>
      ),
    },
    {
      Header: "Created By",
      accessor: "created_user",
      sort: false,
    },
    {
      Header: "Actions",
      accessor: "",
      sort: false,
      Cell: ({ row }: any) => (
        <div className="d-flex justify-content-center align-items-center gap-2 p-2">
          <div className="d-flex justify-content-center align-items-center gap-2">
            {/* Delete Icon */}
            <Link to={`/users/student-details/${row.original.student_id}`} state={row.original.student_id}>
              <FeatherIcons icon="eye" size="15" className="cursor-pointer text-secondary" />
            </Link>
          </div>
          {/* Edit Icon */}
          <Link to="#">
            <FeatherIcons
              icon="edit"
              size="15"
              className="cursor-pointer text-secondary"
              onClick={() => {
                handleUpdate(row.original);
                toggleResponsiveModal();
              }}
            />
          </Link>

          <Link to="#">
            {/* Delete Icon */}
            <FeatherIcons icon="trash-2" size="15" className="cursor-pointer text-secondary" onClick={() => handleDelete(row.original.student_id)} />
          </Link>
        </div>
      ),
    },
  ];
};
