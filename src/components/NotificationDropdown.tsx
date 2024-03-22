import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Dropdown } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import classNames from "classnames";
import FeatherIcons from "feather-icons-react";

//interface
import { NotificationItem } from "../layouts/Topbar";
import Avatar from "../pages/Tickets/Details/Avatar";
import { calculateTimeAgo } from "../constants/functons";
import { readStatusNotification } from "../redux/notifications/actions";
import { useDispatch } from "react-redux";

// notifiaction continer styles
const notificationContainerStyle = {
  maxHeight: "300px",
  display: "none",
};

const notificationShowContainerStyle = {
  maxHeight: "300px",
};

interface Notification {
  notification_id: number;
  message: string;
  created_at: any;
  read_status: boolean;
  user_id: number;
  action_type: string | null;
}

interface NotificationsResponse {
  notifications: Notification[];
}

interface NotificationContainerStyle {
  maxHeight?: string;
  display?: string;
}

const NotificationDropdown = ({ notifications }: NotificationsResponse) => {
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [notificationContentStyle, setNotificationContentStyles] = useState<NotificationContainerStyle>(notificationContainerStyle);

  /*
   * toggle notification-dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setNotificationContentStyles(notificationContentStyle === notificationContainerStyle ? notificationShowContainerStyle : notificationContainerStyle);
  };

  const handleClearNotification = (index: number) => {
    notifications.splice(index, 1);
  };

  const handleRead = (id: string | number) => {
    dispatch(readStatusNotification(id));
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        id="dropdown-notification"
        role="button"
        as="a"
        onClick={toggleDropdown}
        className={classNames("nav-link waves-effect waves-light arrow-none notification-list", { show: dropdownOpen })}
      >
        <i className="fe-bell noti-icon font-22"></i>
        <span className="badge bg-danger rounded-circle noti-icon-badge">{notifications?.filter((item) => item.read_status !== true)?.length}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0">
        <div onClick={toggleDropdown}>
          <div className="p-2 border-top-0 border-start-0 border-end-0 border-dashed border">
            <div className="row align-items-center">
              <div className="col d-flex">
                <h6 className="my-0 font-16 fw-semibold">{notifications?.length <= 0 ? "No notification" : "Notification"}</h6>
              </div>
              <div className="col d-flex justify-content-end">
               
              </div>
            </div>
          </div>
          <SimpleBar className="px-1" style={notificationContentStyle}>
            {(notifications || []).map((item, i) => {
              return (
                <Link onClick={item.read_status ? undefined : ((() => handleRead(item.notification_id)) as any)} to={item.action_type ? item.action_type : ""}>
                  <div className="dropdown-item p-0 notify-item card unread-noti shadow-none mb-1 " key={i + "-noti"}>
                    <div className="card-body">
                      {/* <span
                      className="float-end noti-close-btn text-muted"
                      onClick={() => handleClearNotification(i)}
                    >
                      <i className="mdi mdi-close"></i>
                    </span> */}
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <div className="notify-icon">
                            <Avatar name={""} />
                          </div>
                        </div>
                        <div className="flex-grow-1 text-truncate ms-2">
                          <h5 className="noti-item-title fw-semibold font-14">{item.message}</h5>
                          <div className="d-flex justify-content-between">
                            <small className="noti-item-subtitle text-muted">{calculateTimeAgo(item.created_at)}</small>
                            <small className="noti-item-subtitle">
                              <Badge bg={item.read_status ? "success" : "danger"} as={"span"}>
                                {item.read_status ? "read" : "new"}
                              </Badge>
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </SimpleBar>

          {/* <Link
            to="#"
            className="dropdown-item text-center text-primary notify-item notify-all"
          >
            View All <i className="fe-arrow-right"></i>
          </Link> */}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationDropdown;
