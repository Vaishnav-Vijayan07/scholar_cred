import React from "react";

import AllRoutes from "./routes/Routes";

// import { configureFakeBackend } from "./helpers";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// For Default import Default.scss
import "./assets/scss/Default.scss";

// Other
import "./assets/scss/Landing.scss";
import "./assets/scss/Icons.scss";
import 'react-loading-skeleton/dist/skeleton.css'


const App = () => {
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
