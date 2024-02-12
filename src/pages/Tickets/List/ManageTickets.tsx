import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Dropdown,
  Form,
  Modal,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import classNames from "classnames";

// components
import Table from "../../../components/Table";

// dummy data
import { TicketDetailsItems, getStatusNames, statusvalues } from "./data";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  getAdminTicketStatus,
  getAdminTickets,
  getAdminTicketsCount,
} from "../../../redux/actions";
import { getTicketStatus } from "../../../helpers/api/admin_tickets";
import TicketCounts from "./TicketCounts";
import StatusDropdown from "./StatusDropdown";

/* id column render */
const IdColumn = ({ row }: { row: any }) => {
  return (
    <>
      <b>{row.original.ticket_id}</b>
    </>
  );
};

/* requested by column render */
const RequestedBy = ({ row }: { row: any }) => {
  return (
    <>
      <Link to="#" className="text-body">
        <img
          // src={row.original.requested_by.image}
          alt=""
          title="contact-img"
          className="rounded-circle avatar-xs"
        />
        <span className="ms-2">{`row.original.`}</span>
      </Link>
    </>
  );
};

/* assignee column render */
const AssigneeColumn = ({ row }: { row: any }) => {
  return (
    <>
      <Link to="#">
        <img
          src={row.original.assignee}
          alt=""
          title="contact-img"
          className="rounded-circle avatar-xs"
        />
      </Link>
    </>
  );
};

/* priority column render */
const PriorityColumn = ({ row }: { row: any }) => {
  return (
    <>
      <span>{row.original.status_name}</span>
    </>
  );
};

/* status column render */
const StatusColumn = ({ row }: { row: any }) => {
  return (
    <>
      <span
        className={classNames("badge", {
          "bg-success": row.original.status === "Open",
          "bg-secondary text-light": row.original.status === "Closed",
        })}
      >
        {row.original.status}
      </span>
    </>
  );
};

/* action column render */
const ActionColumn = () => {
  return (
    <>
      <Dropdown className="btn-group" align="end">
        <Dropdown.Toggle variant="light" className="table-action-btn btn-sm">
          <i className="mdi mdi-dots-horizontal"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <i className="mdi mdi-pencil me-2 text-muted font-18 vertical-middle"></i>
            Edit Ticket
          </Dropdown.Item>
          <Dropdown.Item>
            <i className="mdi mdi-check-all me-2 text-muted font-18 vertical-middle"></i>
            Close
          </Dropdown.Item>
          <Dropdown.Item>
            <i className="mdi mdi-delete me-2 text-muted font-18 vertical-middle"></i>
            Remove
          </Dropdown.Item>
          <Dropdown.Item>
            <i className="mdi mdi-star me-2 text-muted font-18 vertical-middle"></i>
            Mark as Unread
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

// get all columns
const columns = [
  {
    Header: "ID",
    accessor: "id",
    sort: true,
    Cell: IdColumn,
  },
  {
    Header: "Requested By",
    accessor: "requested_by",
    sort: true,
    Cell: ({ row }: any) => (
      <span>
        {row.original.student_first_name + " " + row.original.student_last_name}
      </span>
    ),
  },
  {
    Header: "Subject",
    accessor: "subjects_description",
    sort: true,
  },

  {
    Header: "Assignee",
    accessor: "assignee",
    Cell: AssigneeColumn,
  },
  {
    Header: "Status",
    accessor: "status_name",
    sort: true,
    // Cell: ({ row }: any) => {
    //   const [selectedStatus, setSelectedStatus] = useState<string>(
    //     row.original.status_name
    //   );

    //   console.log(row.original.status_name);

    //   const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedStatus(e.target.value);
    //   };

    //   return (
    //     <select value={selectedStatus} onChange={handleStatusChange}>
    //       <option value="Open">Open</option>
    //       <option value="Closed">Close</option>
    //       <option value="Pending">Pending</option>
    //     </select>
    //   );
    // },
    Cell: ({row}:any) => (<StatusDropdown data = {row.original}/>)
  },
  {
    Header: "Priority",
    accessor: "status",
    sort: true,
    Cell: ({ row }: any) => <span>{row.original.status}</span>,
  },
  {
    Header: "Created Date",
    accessor: "ticket_created_at",
    sort: true,
    Cell: ({ row }: any) => (
      <span>{moment(row.original.ticket_created_at).format("YYYY-MM-DD")}</span>
    ),
  },
  {
    Header: "Due Date",
    accessor: "ticket_updated_at",
    sort: true,
    Cell: ({ row }: any) => (
      <span>{moment(row.original.ticket_updated_at).format("YYYY-MM-DD")}</span>
    ),
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ActionColumn,
    sort: false,
  },
];

// get pagelist to display
const sizePerPageList = [
  {
    text: "10",
    value: 10,
  },
  {
    text: "25",
    value: 25,
  },
  {
    text: "50",
    value: 50,
  },
];

interface ManageTicketsProps {
  ticketDetails: TicketDetailsItems[];
}

const ManageTickets = ({ ticketDetails }: ManageTicketsProps) => {
  const { state, initailLoading, status, countDetails, user } = useSelector(
    (state: RootState) => ({
      state: state.AdminTickets.adminTickets.data,
      user: state.Auth,
      status: state.AdminTickets.adminTicketsStatus.data,
      initailLoading: state.AdminTickets.initialLoading,
      countDetails: state.AdminTickets.adminTicketsCount.data || [],
    })
  );
  const dispatch = useDispatch();
  const [options, setOptions] = useState("");
  const [filteredItems, setFilteredItems] = useState(state);

  const handleClearFilter = () => {
    setOptions("");
    setFilteredItems(state);
  };

  const handleStatusChange = (type: any) => {
    const items = state?.filter((item: any) => item.status_name === type);
    setFilteredItems(items);
  };

  useEffect(() => {
    dispatch(getAdminTickets(0));
    dispatch(getAdminTicketsCount());
  }, []);

  useEffect(() => {
    setFilteredItems(state);
  }, [state]);

  useEffect(() => {
    dispatch(getAdminTicketStatus());
  }, []);

  if (initailLoading) {
    return (
      <Spinner
        animation="border"
        style={{ position: "absolute", top: "50%", left: "50%" }}
      />
    );
  }

  return (
    <>
      <TicketCounts countDetails={countDetails} />
      <Card>
        <Card.Body>
          <div className="d-flex float-end">
            <Dropdown className="btn-group" align="end">
              <Dropdown.Toggle
                variant=""
                className="btn-sm btn-outline-blue"
                style={{ minWidth: "150px" }}
              >
                <i className="mdi mdi-filter-variant"></i>{" "}
                {options === "" ? "Filter by status" : options}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ maxHeight: "150px", overflow: "auto" }}>
                <Dropdown.Item
                  key={"clear"}
                  style={{ backgroundColor: "#fa9393" }}
                  onClick={() => [handleClearFilter(), setOptions("")]}
                >
                  <i className="mdi mdi-close"></i> Clear Selection
                </Dropdown.Item>
                {status?.map((item: any) => (
                  <Dropdown.Item
                    key={item.value}
                    onClick={() => [
                      handleStatusChange(item.ticketstatus),
                      setOptions(item.ticketstatus),
                    ]}
                  >
                    {item.ticketstatus}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <h4 className="header-title mb-4">Manage Tickets</h4>

          <Table
            columns={columns}
            data={filteredItems || []}
            pageSize={10}
            sizePerPageList={sizePerPageList}
            isSortable={true}
            pagination={true}
            isSearchable={true}
            theadClass="table-light"
            searchBoxClass="mt-2 mb-3"
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default ManageTickets;
