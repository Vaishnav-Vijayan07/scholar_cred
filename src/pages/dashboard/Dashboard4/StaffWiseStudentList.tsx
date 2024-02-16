import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface UsersBalancesProps {
  staffList: {
    consultant_id: number;
    initiated_count: number;
    pending_count: number;
    staff_id: number;
    staff_name: string;
    total_count: number;
    avatar: string;
  }[];
}

const StaffWiseStudentList = ({ staffList }: UsersBalancesProps) => {
  return (
    <>
      <Card style={{ height: "95%" }}>
        <Card.Body>
          <h4 className="header-title mb-3">Staff Wise Student List</h4>
          <div className="table-responsive">
            <table className="noBorderTable">
              <thead className="table-light" style={{ border: "none !important" }}>
                <tr style={{ border: "none !important" }}>
                  <th colSpan={2} style={{ border: "none !important" }}>
                    Profile
                  </th>
                  <th>Approved Students</th>
                  <th>Pending Students</th>
                  <th>Total Students</th>
                </tr>
              </thead>
              <tbody>
                {(staffList || []).map((item, i) => {
                  return (
                    <tr key={i}>
                      <td style={{ width: "36px" }}>
                        {item.avatar && (
                          <img src={process.env.REACT_APP_BACKEND_URL + item.avatar} alt="contact-img" title="contact-img" className="rounded-circle object-fit-cover avatar-sm" />
                        )}
                      </td>

                      <td>
                        <h5 className="m-0 fw-normal">{item.staff_name}</h5>
                        <p className="mb-0 text-muted">{/* <small>Member Since 2017</small> */}</p>
                      </td>

                      <td>{item.initiated_count}</td>

                      <td>{item.pending_count}</td>

                      <td>{item.total_count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default StaffWiseStudentList;
