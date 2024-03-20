import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import classNames from 'classnames';

// actions
import {
  showRightSidebar,
  changeSidebarType,
  getLatestData,
} from "../redux/actions";

// store
import { RootState, AppDispatch } from "../redux/store";

//constants
import { LayoutTypes, SideBarTypes } from "../constants/layout";

// components
import TopbarSearch from "../components/TopbarSearch";
import MaximizeScreen from "../components/MaximizeScreen";
// import SearchDropdown from '../components/SearchDropdown';
import NotificationDropdown from "../components/NotificationDropdown";
import ProfileDropdown from "../components/ProfileDropdown";

import profilePic from "../assets/images/users/user-1.jpg";
import avatar4 from "../assets/images/users/user-4.jpg";
import logoSm from "../assets/images/logo-sm.png";
import logoDark from "../assets/images/logo-dark.png";
import logoDark2 from "../assets/images/logo-dark-2.png";
import AvatarLogo from "../assets/images/avatar-logo.png";
import { useViewport } from "../hooks/useViewPort";
import { getNotifications } from "../redux/notifications/actions";
import { getUserFromCookie } from "../helpers/api/apiCore";
import axios from "axios";

export interface NotificationItem {
  id: number;
  text: string;
  subText: string;
  icon?: string;
  avatar?: string;
  bgColor?: string;
}

// get the notifications
// const Notifications: NotificationItem[] = [
//   {
//     id: 1,
//     text: "Cristina Pride",
//     subText: "Hi, How are you? What about our next meeting",
//     avatar: profilePic,
//   },
//   {
//     id: 2,
//     text: "Caleb Flakelar commented on Admin",
//     subText: "1 min ago",
//     icon: "mdi mdi-comment-account-outline",
//     bgColor: "primary",
//   },
//   {
//     id: 3,
//     text: "Karen Robinson",
//     subText: "Wow ! this admin looks good and awesome design",
//     avatar: avatar4,
//   },
//   {
//     id: 4,
//     text: "New user registered.",
//     subText: "5 hours ago",
//     icon: "mdi mdi-account-plus",
//     bgColor: "warning",
//   },
//   {
//     id: 5,
//     text: "Caleb Flakelar commented on Admin",
//     subText: "1 min ago",
//     icon: "mdi mdi-comment-account-outline",
//     bgColor: "info",
//   },
//   {
//     id: 6,
//     text: "Carlos Crouch liked Admin",
//     subText: "13 days ago",
//     icon: "mdi mdi-heart",
//     bgColor: "secondary",
//   },
// ];

// get the profilemenu
const ProfileMenus = [
  {
    label: "My Account",
    icon: "fe-user",
    redirectTo: "/profile/details",
  },
  {
    label: "Logout",
    icon: "fe-log-out",
    redirectTo: "/auth/logout2",
  },
];

// dummy search results
const SearchResults = [
  {
    id: 1,
    title: "Analytics Report",
    icon: "uil-notes",
    redirectTo: "#",
  },
  {
    id: 2,
    title: "How can I help you?",
    icon: "uil-life-ring",
    redirectTo: "#",
  },
  {
    id: 3,
    icon: "uil-cog",
    title: "User profile settings",
    redirectTo: "#",
  },
];

const otherOptions = [
  {
    id: 1,
    label: "New Projects",
    icon: "fe-briefcase",
  },
  {
    id: 2,
    label: "Create Users",
    icon: "fe-user",
  },
  {
    id: 3,
    label: "Revenue Report",
    icon: "fe-bar-chart-line-",
  },
  {
    id: 4,
    label: "Settings",
    icon: "fe-settings",
  },
  {
    id: 4,
    label: "Help & Support",
    icon: "fe-headphones",
  },
];

interface TopbarProps {
  hideLogo?: boolean;
  navCssClasses?: string;
  openLeftMenuCallBack?: () => void;
  topbarDark?: boolean;
}

const Topbar = ({
  hideLogo,
  navCssClasses,
  openLeftMenuCallBack,
  topbarDark,
}: TopbarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { width } = useViewport();

  const refreshing = useSelector(
    (state: any) => state.refreshReducer.refreshing
  );
  const [user, setUser] = useState<any>([]);

  useEffect(() => {
    const { user_id } = getUserFromCookie();
    (async () => {
      try {
        const response = await axios.get(`admin_users_by_userid?id=${user_id}`);
        const result = response.data.data;
        setUser(result);
      } catch (error) {
        console.error("Error fetching personal info:", error);
      }
    })();
  }, [refreshing]);

  console.log(user);

  const navbarCssClasses: string = navCssClasses || "";
  const containerCssClasses: string = !hideLogo ? "container-fluid" : "";

  const { layoutType, leftSideBarType, notifications } = useSelector(
    (state: RootState) => ({
      layoutType: state.Layout.layoutType,
      leftSideBarType: state.Layout.leftSideBarType,
      notifications: state.Notifications.notifications,
    })
  );

  /**
   * Toggle the leftmenu when having mobile screen
   */
  const handleLeftMenuCallBack = () => {
    if (width < 1140) {
      if (leftSideBarType === "full") {
        showLeftSideBarBackdrop();
        document
          .getElementsByTagName("html")[0]
          .classList.add("sidebar-enable");
      } else {
        dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_FULL));
      }
    } else if (leftSideBarType === "condensed") {
      dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT));
    } else if (leftSideBarType === "full") {
      showLeftSideBarBackdrop();
      document.getElementsByTagName("html")[0].classList.add("sidebar-enable");
    } else if (leftSideBarType === "fullscreen") {
      dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT));
      // showLeftSideBarBackdrop();
      document.getElementsByTagName("html")[0].classList.add("sidebar-enable");
    } else {
      dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED));
    }
  };

  // create backdrop for leftsidebar
  function showLeftSideBarBackdrop() {
    const backdrop = document.createElement("div");
    backdrop.id = "custom-backdrop";
    backdrop.className = "offcanvas-backdrop fade show";
    // backdrop.style.zIndex = '999'
    document.body.appendChild(backdrop);

    if (
      document.getElementsByTagName("html")[0]?.getAttribute("dir") !== "rtl"
    ) {
      document.body.style.overflow = "hidden";
      if (width > 1140) {
        document.body.style.paddingRight = "15px";
      }
    }

    backdrop.addEventListener("click", function (e) {
      document
        .getElementsByTagName("html")[0]
        .classList.remove("sidebar-enable");
      dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_FULL));
      hideLeftSideBarBackdrop();
    });
  }

  function hideLeftSideBarBackdrop() {
    var backdrop = document.getElementById("custom-backdrop");
    if (backdrop) {
      document.body.removeChild(backdrop);
      document.body.style.overflow = "visible";
    }
  }

  /**
   * Toggles the right sidebar
   */
  const handleRightSideBar = () => {
    dispatch(showRightSidebar());
  };

  /**
   * Toggles the left sidebar width
   */
  // const toggleLeftSidebarWidth = () => {
  //   if (leftSideBarType === 'default' || leftSideBarType === 'compact')
  //     dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED));
  //   if (leftSideBarType === 'condensed') dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT));
  // };

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  return (
    <React.Fragment>
      <div className={`navbar-custom ${navbarCssClasses}`}>
        <div className={`topbar ${containerCssClasses}`}>
          <div className="topbar-menu d-flex align-items-center gap-1">
            {!hideLogo && (
              <div className="logo-box">
                <Link to="/" className="logo logo-dark text-center">
                  <span className="logo-sm">
                    <img src={logoSm} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img
                      src={
                        layoutType === LayoutTypes.LAYOUT_TWO_COLUMN
                          ? logoDark2
                          : logoDark
                      }
                      alt=""
                      height="30"
                    />
                  </span>
                </Link>
                <Link to="/" className="logo logo-light text-center">
                  <span className="logo-sm">
                    <img src={logoSm} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img
                      src={
                        layoutType === LayoutTypes.LAYOUT_TWO_COLUMN
                          ? logoSm
                          : logoSm
                      }
                      alt=""
                      height="30"
                    />
                  </span>
                </Link>
              </div>
            )}

            <button
              className="button-toggle-menu"
              onClick={handleLeftMenuCallBack}
            >
              <i className="mdi mdi-menu" />
            </button>
          </div>

          <ul className="topbar-menu d-flex align-items-center">
            <li className="app-search dropdown d-none d-sm-block">
              <TopbarSearch items={SearchResults} />
            </li>
            <li className="dropdown d-none d-lg-inline-block">
              <MaximizeScreen />
            </li>
            <li className="dropdown notification-list">
              <NotificationDropdown notifications={notifications} />
            </li>
            <li className="dropdown d-flex flex-column">
              <ProfileDropdown
                profilePic={
                  user?.user_type_id === 1
                    ? AvatarLogo ||
                      (user?.image
                        ? `${process.env.REACT_APP_BACKEND_URL}${
                            user?.Avatar || user?.image
                          }`
                        : `${process.env.REACT_APP_BACKEND_URL}${
                            user?.Avatar || user?.image_url
                          }`)
                    : user?.image
                    ? `${process.env.REACT_APP_BACKEND_URL}${
                        user?.Avatar || user?.image
                      }`
                    : `${process.env.REACT_APP_BACKEND_URL}${
                        user?.Avatar || user?.image_url
                      }`
                }
                menuItems={ProfileMenus}
                username={
                  user?.role_name == "ADMIN"
                    ? user?.full_name
                    : user?.full_name?.split(" ")[0]
                }
                userTitle={user?.type_name}
              />
            </li>
            {/* <li>
              <button className="nav-link dropdown-toggle right-bar-toggle waves-effect waves-light btn btn-link shadow-none" onClick={handleRightSideBar}>
                <i className="fe-settings noti-icon font-22"></i>
              </button>
            </li> */}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Topbar;
