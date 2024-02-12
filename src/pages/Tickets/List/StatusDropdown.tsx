import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Dropdown } from "react-bootstrap";
import { updateAdminTicketStatus } from "../../../redux/actions";

interface Props {
  data: any;
}

const StatusDropdown: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state: RootState) => ({
    status: state.AdminTickets.adminTicketsStatus.data,
  }));

  const [selectedStatus, setSelectedStatus] = useState<string>(
    data.status_name
  );

  useEffect(() => {
    setSelectedStatus(data.status_name);
  }, [data]);

  console.log(data.status_name);

  const handleStatusChange = (status_id: any) => {
    console.log(status_id, data.ticket_id);

    dispatch(updateAdminTicketStatus(status_id, data.ticket_id));
  };

  return (
    <Dropdown className="btn-group" align="end">
      <Dropdown.Toggle variant="" className="btn-sm btn-outline-dark">
        {selectedStatus}
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ maxHeight: "150px", overflow: "auto" }}>
        {status
          ?.filter((item: any) => item.ticketstatus !== selectedStatus)
          .map((item: any) => (
            <Dropdown.Item
              key={item.value}
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
