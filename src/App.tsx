import React, { useEffect } from "react";
import AllRoutes from "./routes/Routes";

// import { configureFakeBackend } from "./helpers";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// For Default import Default.scss
import "./assets/scss/Default.scss";

// Other
import "./assets/scss/Landing.scss";
import "./assets/scss/Icons.scss";
import { useDispatch, useSelector } from "react-redux";
import { refreshData } from "./reducer/refreshReducer";
import { RootState } from "./redux/store";
import io from "socket.io-client";
import { message as andMessage } from "antd";
import { refreshNotifications } from "./redux/notifications/actions";
import { refreshComments } from "./redux/tickets/actions";
import axios from "axios";
import { getToken } from "firebase/messaging";
import { messaging } from "./helpers/firebase";

const App = () => {
  const dispatch = useDispatch();
  const { user, refreshing, notificationRefresh, commentsRefresh } =
    useSelector((state: RootState) => {
      return {
        user: state.Auth.user,
        refreshing: state.refreshReducer.refreshing,
        notificationRefresh: state.Notifications.notificationRefresh,
        commentsRefresh: state.Tickets.commentsRefresh,
      };
    });

  // const socket = io(process.env.REACT_APP_BACKEND_URL || "", {
  //   auth: {
  //     token: user?.token,
  //   },
  // });

  // useEffect(() => {
  //   if (user?.user_id) {
  //     socket.emit("userid", user.user_id);
  //   }

  //   const handleNotified = ({ message, roles }: any) => {
  //     if (user && user.role_name && roles.includes(user.role_name)) {
  //       andMessage.success(message);
  //     }
  //     dispatch(refreshNotifications());
  //   };

  //   const handleCommentsAdded = ({ message, roles }: any) => {
  //     if (user && user.role_name && roles.includes(user.role_name)) {
  //       andMessage.success(message);
  //     }
  //     dispatch(refreshComments());
  //     dispatch(refreshNotifications());
  //   };

  //   socket.on("notified", handleNotified);
  //   socket.on("commentsadded", handleCommentsAdded);

  //   return () => {
  //     socket.off("notified", handleNotified);
  //     socket.off("commentsadded", handleCommentsAdded);
  //   };
  // }, [user, dispatch]);

  return (
    <>
      <React.Fragment>
        <ToastContainer />
        <AllRoutes />
      </React.Fragment>
    </>
  );
};

export default App;
