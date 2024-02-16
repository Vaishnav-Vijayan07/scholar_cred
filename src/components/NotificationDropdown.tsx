import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import classNames from "classnames";
import FeatherIcons from "feather-icons-react";

//interface
import { NotificationItem } from "../layouts/Topbar";
import Avatar from "../pages/Tickets/Details/Avatar";
import { calculateTimeAgo } from "../constants/functons";

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
}

interface NotificationsResponse {
  notifications: Notification[];
}

interface NotificationContainerStyle {
  maxHeight?: string;
  display?: string;
}

const NotificationDropdown = ({ notifications }: NotificationsResponse) => {
  console.log(notifications);

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [notificationContentStyle, setNotificationContentStyles] =
    useState<NotificationContainerStyle>(notificationContainerStyle);

  /*
   * toggle notification-dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setNotificationContentStyles(
      notificationContentStyle === notificationContainerStyle
        ? notificationShowContainerStyle
        : notificationContainerStyle
    );
  };

  const handleClearNotification = (index: number) => {
    notifications.splice(index, 1);
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        id="dropdown-notification"
        role="button"
        as="a"
        onClick={toggleDropdown}
        className={classNames(
          "nav-link waves-effect waves-light arrow-none notification-list",
          { show: dropdownOpen }
        )}
      >
        <i className="fe-bell noti-icon font-22"></i>
        <span className="badge bg-danger rounded-circle noti-icon-badge">
          {notifications?.length}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0">
        <div onClick={toggleDropdown}>
          <div className="p-2 border-top-0 border-start-0 border-end-0 border-dashed border">
            <div className="row align-items-center">
              <div className="col">
                <h6 className="m-0 font-16 fw-semibold">Notification</h6>
              </div>
              <div className="col-auto"></div>
            </div>
          </div>
          <SimpleBar className="px-1" style={notificationContentStyle}>
            {(notifications || []).map((item, i) => {
              return (
                <div
                  className="dropdown-item p-0 notify-item card unread-noti shadow-none mb-1"
                  key={i + "-noti"}
                >
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
                        <h5 className="noti-item-title fw-semibold font-14">
                          {item.message}
                        </h5>
                        <small className="noti-item-subtitle text-muted">
                          {calculateTimeAgo(item.created_at)}
                        </small>
                      </div>
                      <small className="noti-item-subtitle text-muted">
                        <FeatherIcons
                          icon="check-circle"
                          size="15"
                          className="cursor-pointer text-secondary"
                        />
                      </small>
                    </div>
                  </div>
                </div>
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
