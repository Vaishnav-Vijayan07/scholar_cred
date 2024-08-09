import React, { useEffect, useState } from "react";
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
import { RootState } from "./redux/store";
import { message as andMessage, notification } from "antd";
import { refreshNotifications } from "./redux/notifications/actions";
import { refreshComments } from "./redux/tickets/actions";
// import { socket } from "./socket";

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => {
    return {
      user: state.Auth.user,
    };
  });

  // console.log(socket);

  // useEffect(() => {
  //   if (user !== null) {
  //     console.log("here");
  //     socket.emit("userid", user.user_id);

  //     const handleNotified = ({ message, roles }: any) => {
  //       if (user && user.role_name && roles.includes(user.role_name)) {
  //         // andMessage.success(message);
  //         notification.success({
  //           message,
  //           duration: 3,
  //           placement: "bottomRight",
  //           closeIcon: true,
  //         });
  //       }
  //       dispatch(refreshNotifications());
  //     };

  //     const handleCommentsAdded = ({ message, roles }: any) => {
  //       if (user && user.role_name && roles.includes(user.role_name)) {
  //         andMessage.success(message);
  //       }
  //       dispatch(refreshComments());
  //       dispatch(refreshNotifications());
  //     };

  //     socket.on("notified", handleNotified);
  //     socket.on("commentsadded", handleCommentsAdded);
  //   }
  //   return () => {
  //     socket.off("notified");
  //     socket.off("commentsadded");
  //   };
  // }, [user, socket]);

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
