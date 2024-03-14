import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { getMenuItems } from "../helpers/menu";
// store
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// constants
import { LayoutTypes } from "../constants/layout";

// components
import AppMenu from "./Menu";

import logoSm from "../assets/images/logo-sm.png";
import logoDark from "../assets/images/logo-dark.png";
import logoDark2 from "../assets/images/logo-dark-2.png";
import logoLight from "../assets/images/logo-light.png";
import logoLight2 from "../assets/images/logo-light-2.png";

/* user box */

/* sidebar content */
const SideBarContent = () => {
  return (
    <>
      <div id="sidebar-menu">
        <AppMenu menuItems={getMenuItems()} />
      </div>

      <div className="clearfix" />
    </>
  );
};

interface LeftSidebarProps {
  isCondensed: boolean;
  hideLogo?: boolean;
}

const LeftSidebar = ({ isCondensed, hideLogo }: LeftSidebarProps) => {
  const menuNodeRef: any = useRef(null);

  const { user } = useSelector((state: RootState) => ({
    user: state.Auth.user,
  }));

  const { layoutType } = useSelector((state: RootState) => ({
    layoutType: state.Layout.layoutType,
    leftSideBarType: state.Layout.leftSideBarType,
  }));

  /**
   * Handle the click anywhere in doc
   */
  const handleOtherClick = (e: any) => {
    if (menuNodeRef && menuNodeRef.current && menuNodeRef.current.contains(e.target)) return;
    // else hide the menubar
    if (document.body) {
      document.body.classList.remove("sidebar-enable");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOtherClick, false);

    return () => {
      document.removeEventListener("mousedown", handleOtherClick, false);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="app-menu" ref={menuNodeRef}>
        {!hideLogo && (
          <div className="logo-box">
            <Link to="/" className="logo logo-dark text-center">
              <span className="logo-sm">
                <img src={logoSm} alt="" height="30" />
              </span>
              <span className="logo-lg">
                {user?.role == "7" || user?.role == "4" ? (
                  <img src={`${process.env.REACT_APP_BACKEND_URL}${user?.image_url}`} alt="" height="50" style={{ maxWidth: "150px" }} />
                ) : (
                  <img src={layoutType === LayoutTypes.LAYOUT_TWO_COLUMN ? logoDark2 : logoDark} alt="" height="34" />
                )}
              </span>
            </Link>
            <Link to="/" className="logo logo-light text-center">
              <span className="logo-sm">
                <img src={logoSm} alt="" height="30" />
              </span>
              <span className="logo-lg">
                <img src={layoutType === LayoutTypes.LAYOUT_TWO_COLUMN ? logoLight2 : logoLight} alt="" height="20" />
              </span>
            </Link>
          </div>
        )}

        {!isCondensed && (
          <SimpleBar
            className="scrollbar show h-100 pb-4"
            // style={{ maxHeight: '100%' }}
            // timeout={500}
            scrollbarMaxSize={320}
          >
            <SideBarContent />
          </SimpleBar>
        )}
        {user?.role == "7" || user?.role == "4" ? (
          <div style={{ position: "absolute", bottom: "0", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", background: "#fff" }}>
            <p className="small mb-1" style={{ lineHeight: "0" }}>
              Powered By
            </p>
            <img src={layoutType === LayoutTypes.LAYOUT_TWO_COLUMN ? logoDark2 : logoDark} alt="" height="25" className="mb-2" />
          </div>
        ) : (
          ""
        )}
        {isCondensed && <SideBarContent />}
      </div>
    </React.Fragment>
  );
};

LeftSidebar.defaultProps = {
  isCondensed: false,
};

export default LeftSidebar;
