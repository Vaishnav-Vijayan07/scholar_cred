import React from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";

import { APICore } from "../helpers/api/apiCore";

/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  roles?: string[];
}
const PrivateRoute = ({ component: Component, roles, ...rest }: PrivateRouteProps) => {
  const api = new APICore();

  // return (
  //   <Route
  //     {...rest}
  //     render={(props: RouteProps) => {
  if (api.isUserAuthenticated() === false) {
    // not logged in so redirect to login page with the return url
    return (
      <Navigate
        // state={from: props['path']}
        to={{
          pathname: "/auth/login2/",
          // state: { from: props['path'] },
        }}
      />
    );
  }

  const loggedInUser = api.getLoggedInUser();

  // check if route is restricted by role
  // if (roles && roles.indexOf(loggedInUser.role) === -1) {
  //   // role not authorised so redirect to login page
  //   return <Navigate to={{ pathname: "/" }} />;
  // }
  if (roles && !roles?.includes(loggedInUser?.role_name)) {
    // No matching role found, so redirect to the unauthorized page
    return <Navigate to={{ pathname: "/unauthorized" }} />;
  }
  // authorised so return component
  return <Component />;
  // }}
  // />
  // );
};

export default PrivateRoute;
