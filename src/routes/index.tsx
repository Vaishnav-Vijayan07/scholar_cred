import React from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";

// components
import PrivateRoute from "./PrivateRoute";
// import Root from './Root';

// lazy load all the views

// auth2
const Login2 = React.lazy(() => import("../pages/auth2/Login2"));
const Logout2 = React.lazy(() => import("../pages/auth2/Logout2"));
const Register2 = React.lazy(() => import("../pages/auth2/Register2"));
const Confirm2 = React.lazy(() => import("../pages/auth2/Confirm2"));
const ForgetPassword2 = React.lazy(() => import("../pages/auth2/ForgetPassword2"));
const LockScreen2 = React.lazy(() => import("../pages/auth2/LockScreen2"));
const SignInSignUp2 = React.lazy(() => import("../pages/auth2/SignInSignUp2"));
// dashboard
const Dashboard4 = React.lazy(() => import("../pages/dashboard/Dashboard4/"));
// - crm pages
const CRMLeads = React.lazy(() => import("../pages/apps/CRM/Leads/"));

// user pages
const Consultant = React.lazy(() => import("../pages/users/Consultant"));
const ConsultantStaff = React.lazy(() => import("../pages/users/ConsultantStaff"));
const ConsultantDetails = React.lazy(() => import("../pages/users/ConsultantDetails"));
const Staff = React.lazy(() => import("../pages/users/Staff"));
const Students = React.lazy(() => import("../pages/users/Students"));
const AdminUsers = React.lazy(() => import("../pages/super_admin/AdminUsers"));
const ForbiddenPage = React.lazy(() => import("../pages/errors/ForbiddenPage"));

export interface RoutesProps {
  path: RouteProps["path"];
  name?: string;
  element?: RouteProps["element"];
  route?: any;
  exact?: boolean;
  icon?: string;
  header?: string;
  roles?: string[];
  children?: RoutesProps[];
}

const dashboardRoutes: RoutesProps = {
  path: "/dash",
  name: "Dashboards",
  icon: "airplay",
  header: "Navigation",
  children: [
    {
      path: "/",
      name: "Root",
      element: <Navigate to="/dashboard" />,
      roles: ["CRED_ADMIN", "CONSULTANT_ADMIN", "SUPER_USER", "CRED_STAFF", "CONSULTANT", "CONSULTANT_STAFF"],
      route: PrivateRoute,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      element: <PrivateRoute roles={["CRED_ADMIN", "CONSULTANT_ADMIN", "SUPER_USER", "CRED_STAFF", "CONSULTANT", "CONSULTANT_STAFF"]} component={Dashboard4} />,
      route: PrivateRoute,
    },
  ],
};

const crmAppRoutes = {
  path: "/apps/crm",
  name: "CRM",
  route: PrivateRoute,
  roles: ["CRED_ADMIN"],
  icon: "users",
  children: [
    {
      path: "/apps/crm/leads",
      name: "Leads",
      element: <PrivateRoute roles={["CRED_ADMIN", "SUPER_USER"]} component={CRMLeads} />,
      route: PrivateRoute,
    },
  ],
};

const userRoutes = {
  path: "/users",
  name: "Users",
  route: PrivateRoute,
  roles: ["CRED_ADMIN", "SUPER_USER", "CRED_STAFF", "CONSULTANT_STAFF"],
  icon: "users",
  children: [
    {
      path: "/users/consultant",
      name: "Consultant",
      element: <PrivateRoute roles={["CRED_ADMIN", "SUPER_USER"]} component={Consultant} />,
      route: PrivateRoute,
    },
    {
      path: "/users/staff",
      name: "Staff",
      element: <PrivateRoute roles={["CRED_ADMIN", "SUPER_USER"]} component={Staff} />,
      route: PrivateRoute,
    },
    {
      path: "/users/consultant/:id",
      name: "Consultant details",
      element: <PrivateRoute roles={["CRED_ADMIN", "SUPER_USER"]} component={ConsultantDetails} />,
      route: PrivateRoute,
    },
    {
      path: "/users/students",
      name: "Students",
      element: <PrivateRoute roles={["CRED_ADMIN", "SUPER_USER", "CONSULTANT_ADMIN", "CONSULTANT_STAFF", "CRED_STAFF", "CONSULTANT_STAFF"]} component={Students} />,
      route: PrivateRoute,
    },
  ],
};

const credadminRoutes = {
  path: "/cred-admin-users",
  name: "Cred admin users",
  route: PrivateRoute,
  roles: ["SUPER_USER", "CRED_STAFF", "CONSULTANT"],
  icon: "users",
  children: [
    {
      path: "/cred_admin/cred_user_management",
      name: "Students",
      element: <PrivateRoute roles={["SUPER_USER", "CRED_STAFF", "CONSULTANT"]} component={AdminUsers} />,
      route: PrivateRoute,
    },
  ],
};

const consultantRoutes = {
  path: "/consultant-users",
  name: "Consultant users",
  route: PrivateRoute,
  roles: ["CONSULTANT_ADMIN", "SUPER_USER"],
  icon: "users",
  children: [
    {
      path: "/consultant-users/staff",
      name: "Staff",
      element: <PrivateRoute roles={["CONSULTANT_ADMIN", "SUPER_USER"]} component={ConsultantStaff} />,
      route: PrivateRoute,
    },
  ],
};

const appRoutes = [crmAppRoutes];

// pages

// auth
const authRoutes: RoutesProps[] = [
  {
    path: "/auth/login2",
    name: "Login2",
    element: <Login2 />,
    route: Route,
  },
  {
    path: "/auth/logout2",
    name: "Logout2",
    element: <Logout2 />,
    route: Route,
  },
  {
    path: "/auth/register2",
    name: "Register2",
    element: <Register2 />,
    route: Route,
  },
  {
    path: "/auth/confirm2",
    name: "Confirm2",
    element: <Confirm2 />,
    route: Route,
  },
  {
    path: "/auth/forget-password2",
    name: "Forget Password2",
    element: <ForgetPassword2 />,
    route: Route,
  },
  {
    path: "/auth/signin-signup2",
    name: "SignIn-SignUp2",
    element: <SignInSignUp2 />,
    route: Route,
  },
  {
    path: "/auth/lock-screen2",
    name: "Lock Screen2",
    element: <LockScreen2 />,
    route: Route,
  },
];

// public routes
const otherPublicRoutes = [
  {
    path: "/unauthorized",
    name: "forbidden",
    element: <ForbiddenPage />,
    route: Route,
  },
];

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
  let flatRoutes: RoutesProps[] = [];

  routes = routes || [];
  routes.forEach((item: RoutesProps) => {
    flatRoutes.push(item);

    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const authProtectedRoutes = [dashboardRoutes, ...appRoutes, userRoutes, consultantRoutes, credadminRoutes];
const publicRoutes = [...authRoutes, ...otherPublicRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes };
