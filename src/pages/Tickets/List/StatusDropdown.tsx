import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Dropdown } from "react-bootstrap";
import { updateAdminTicketStatus } from "../../../redux/actions";
import { getStatusProperties } from "./data";

interface Props {
  data: any;
}

const StatusDropdown: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();
  const { status, user } = useSelector((state: RootState) => ({
    status: state.AdminTickets.adminTicketsStatus.data,
    user: state.Auth.user,
  }));

  const roles:string[] = ["3", "4", "5", "7", "6"];

  const [selectedStatus, setSelectedStatus] = useState<string>(
    data.status_name
  );

  useEffect(() => {
    setSelectedStatus(data.status_name);
  }, [data]);
  const handleStatusChange = (status_id: any) => {
    dispatch(updateAdminTicketStatus(status_id, data.ticket_id));
  };

  return (
    <Dropdown className="btn-group" align="end">
      <Dropdown.Toggle
        variant=""
        className={`btn-sm bg-${
          getStatusProperties(selectedStatus).variant
        } text-white`}
        disabled={selectedStatus === "Closed" || roles.includes(user.role)}
      >
        {selectedStatus}
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ maxHeight: "150px", overflow: "auto" }}>
        {status
          ?.filter((item: any) => item.ticketstatus !== selectedStatus)
          .map((item: any) => (
            <Dropdown.Item
              key={item.ticketstatus}
              onClick={() => handleStatusChange(item.id)}
            >
              {item.ticketstatus}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default StatusDropdown;
