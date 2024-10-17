import React from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";

// components
import PrivateRoute from "./PrivateRoute";
// import Root from './Root';

// lazy load all the views

// auth2
const Login2 = React.lazy(() => import("../pages/auth2/Login2"));
const StudentLogin = React.lazy(
  () => import("../pages/studentAuth/StudentLogin")
);
const Logout2 = React.lazy(() => import("../pages/auth2/Logout2"));
const Register2 = React.lazy(() => import("../pages/auth2/Register2"));
const Confirm2 = React.lazy(() => import("../pages/auth2/Confirm2"));
const ForgetPassword2 = React.lazy(
  () => import("../pages/auth2/ForgetPassword2")
);
const NotFound = React.lazy(() => import("../pages/errors/Error404"));
const LockScreen2 = React.lazy(() => import("../pages/auth2/LockScreen2"));
const SignInSignUp2 = React.lazy(() => import("../pages/auth2/SignInSignUp2"));
// dashboard
const Dashboard4 = React.lazy(() => import("../pages/dashboard/Dashboard4/"));
const ProfilePage = React.lazy(() => import("../pages/profile"));

// user pages
const Consultant = React.lazy(() => import("../pages/users/Consultant"));
const ConsultantStaff = React.lazy(
  () => import("../pages/users/ConsultantStaff")
);

const TransactionsConsultant = React.lazy(
  () => import("../pages/Forex/Consultant/Transactions")
);

const CommisionSummary = React.lazy(
  () => import("../pages/Forex/Cred-admin/Summary")
);

const CommissionsConsultant = React.lazy(
  () => import("../pages/Forex/Consultant/Commissions")
);

const TransactionsAdmin = React.lazy(
  () => import("../pages/Forex/Cred-admin/Transactions")
);

const CommissionsAdmin = React.lazy(
  () => import("../pages/Forex/Cred-admin/Commissions")
);

const ReportSection = React.lazy(
  () => import("../pages/Forex/Cred-admin/ReportSection")
);

const ConsultantDetails = React.lazy(
  () => import("../pages/users/ConsultantDetails")
);

const Staff = React.lazy(() => import("../pages/users/Staff"));
const AdminUsers = React.lazy(() => import("../pages/super_admin/AdminUsers"));
const ForbiddenPage = React.lazy(() => import("../pages/errors/ForbiddenPage"));
const Tickets = React.lazy(() => import("../pages/Tickets/List/ManageTickets"));
const TicketDetails = React.lazy(() => import("../pages/Tickets/Details"));
const ClosedTickets = React.lazy(
  () => import("../pages/Tickets/List/ManageClosedTickets")
);
const ApplicationStatusManagement = React.lazy(
  () => import("../pages/super_admin/ApplicationStatusManagement")
);
const LoanStatus = React.lazy(() => import("../pages/super_admin/LoanStatus"));
const InternalStatus = React.lazy(
  () => import("../pages/super_admin/InternalStatus")
);

// Students
const AllStudents = React.lazy(() => import("../pages/student/AllStudents"));

const IntakeStudents = React.lazy(
  () => import("../pages/student/IntakeStudents")
);
const StudentAdminView = React.lazy(
  () => import("../pages/student/AdminStudentList/StudentAdminView")
);
const StudentAdminViewIntake = React.lazy(
  () => import("../pages/student/AdminStudentList/StudentAdminViewPending")
);
const DirectStudents = React.lazy(
  () => import("../pages/student/AdminStudentList/DirectStudents")
);
const RegisteredStudents = React.lazy(
  () => import("../pages/student/AdminStudentList/RegisteredStudents")
);
const DeletedStudents = React.lazy(
  () => import("../pages/student/AdminStudentList/DeletedStudents")
);

const StudentDetails = React.lazy(
  () => import("../pages/student/StudentDetails")
);
const StudentDetailsConsultant = React.lazy(
  () => import("../pages/student/StudentDetailsConsultant")
);

const EbixStaff = React.lazy(
  () => import("../pages/Forex/Super-admin/AddEbixStaff")
);

const EbixStafftudentsList = React.lazy(
  () => import("../pages/Forex/Ebix_staff/StudentsList")
);

const EbixStafftudent = React.lazy(
  () => import("../pages/Forex/Ebix_staff/StudentDetails")
);

const EbixSwiftCopyList = React.lazy(
  () => import("../pages/Forex/Ebix_staff/SwiftCopyList")
);

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
      roles: [
        "CRED_ADMIN",
        "CONSULTANT_ADMIN",
        "SUPER_USER",
        "CRED_STAFF",
        "CONSULTANT",
        "CONSULTANT_STAFF",
        "EBIX_STAFF",
      ],
      route: PrivateRoute,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      element: (
        <PrivateRoute
          roles={[
            "CRED_ADMIN",
            "CONSULTANT_ADMIN",
            "SUPER_USER",
            "CRED_STAFF",
            "CONSULTANT",
            "CONSULTANT_STAFF",
            "EBIX_STAFF",
          ]}
          component={Dashboard4}
        />
      ),
      route: PrivateRoute,
    },
  ],
};

const crmAppRoutes = {
  path: "/apps",
  name: "CRM",
  route: PrivateRoute,
  roles: ["CRED_ADMIN"],
  icon: "users",
  children: [
    {
      path: "/apps/Tickets",
      name: "Tickets",
      element: (
        <PrivateRoute
          roles={[
            "CRED_ADMIN",
            "CONSULTANT_ADMIN",
            "SUPER_USER",
            "CRED_STAFF",
            "CONSULTANT",
            "CONSULTANT_STAFF",
          ]}
          component={Tickets}
        />
      ),
      route: PrivateRoute,
    },
    {
      path: "/apps/Tickets-details/:id",
      name: "Ticket Details",
      element: (
        <PrivateRoute
          roles={[
            "CRED_ADMIN",
            "CONSULTANT_ADMIN",
            "SUPER_USER",
            "CRED_STAFF",
            "CONSULTANT",
            "CONSULTANT_STAFF",
          ]}
          component={TicketDetails}
        />
      ),
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
      path: "/admin/ebix/staff_management",
      name: "Consultant",
      element: <PrivateRoute roles={["SUPER_USER"]} component={EbixStaff} />,
      route: PrivateRoute,
    },
    {
      path: "/users/consultant",
      name: "Consultant",
      element: (
        <PrivateRoute
          roles={["CRED_ADMIN", "SUPER_USER"]}
          component={Consultant}
        />
      ),
      route: PrivateRoute,
    },
    {
      path: "/users/staff",
      name: "Staff",
      element: (
        <PrivateRoute roles={["CRED_ADMIN", "SUPER_USER"]} component={Staff} />
      ),
      route: PrivateRoute,
    },
    {
      path: "/users/consultant/:id",
      name: "Consultant details",
      element: (
        <PrivateRoute
          roles={["CRED_ADMIN", "SUPER_USER"]}
          component={ConsultantDetails}
        />
      ),
      route: PrivateRoute,
    },
    {
      path: "/users/students",
      name: "Students",
      element: (
        <PrivateRoute
          roles={[
            "SUPER_USER",
            "CONSULTANT_ADMIN",
            "CONSULTANT_STAFF",
            "CRED_STAFF",
            "CONSULTANT_STAFF",
          ]}
          component={AllStudents}
        />
      ),
      route: PrivateRoute,
    },
    {
      path: "/users/intake-students",
      name: "Students",
      element: (
        <PrivateRoute
          roles={[
            "SUPER_USER",
            "CONSULTANT_ADMIN",
            "CONSULTANT_STAFF",
            "CRED_STAFF",
            "CONSULTANT_STAFF",
          ]}
          component={IntakeStudents}
        />
      ),
      route: PrivateRoute,
    },
    {
      path: "/users/registered-students",
      name: "Students",
      element: (
        <PrivateRoute roles={["CRED_STAFF"]} component={RegisteredStudents} />
      ),
      route: PrivateRoute,
    },
    {
      path: "/users/direct-students",
      name: "Students",
      element: (
        <PrivateRoute roles={["CRED_STAFF"]} component={DirectStudents} />
      ),
      route: PrivateRoute,
    },
    {
      path: "/cred-admin/students",
      name: "Students",
      element: (
        <PrivateRoute roles={["CRED_ADMIN","CRED_STAFF"]} component={StudentAdminView} />
      ),
      route: PrivateRoute,
    },
    {
      path: "/cred-admin/pending-students",
      name: "Students",
      element: (
        <PrivateRoute
          roles={["CRED_ADMIN"]}
          component={StudentAdminViewIntake}
        />
      ),
      route: PrivateRoute,
    },
    {
      path: "/cred-admin/registered-students",
      name: "Students",
      element: (
        <PrivateRoute roles={["CRED_ADMIN"]} component={RegisteredStudents} />
      ),
      route: PrivateRoute,
    },
    {
      path: "/cred-admin/direct-students",
      name: "Students",
      element: (
        <PrivateRoute roles={["CRED_ADMIN"]} component={DirectStudents} />
      ),
      route: PrivateRoute,
    },
    {
      path: "/cred-admin/deleted-students",
      name: "Students",
      element: (
        <PrivateRoute roles={["CRED_ADMIN"]} component={DeletedStudents} />
      ),
      route: PrivateRoute,
    },
    {
      path: "/users/student-details/:id",
      name: "Student Details",
      element: (
        <PrivateRoute
          roles={[
            "CRED_ADMIN",
            "SUPER_USER",
            "CONSULTANT_ADMIN",
            "CONSULTANT_STAFF",
            "CRED_STAFF",
            "CONSULTANT_STAFF",
          ]}
          component={StudentDetails}
        />
      ),
      route: PrivateRoute,
    },
    {
      path: "/users/student-details-consultant/:id",
      name: "Student Details Consultant",
      element: (
        <PrivateRoute
          roles={[
            "CRED_ADMIN",
            "SUPER_USER",
            "CONSULTANT_ADMIN",
            "CONSULTANT_STAFF",
            "CRED_STAFF",
            "CONSULTANT_STAFF",
          ]}
          component={StudentDetailsConsultant}
        />
      ),
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
      name: "AdminUsers",
      element: (
        <PrivateRoute
          roles={["SUPER_USER", "CRED_STAFF", "CONSULTANT"]}
          component={AdminUsers}
        />
      ),
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
      element: (
        <PrivateRoute
          roles={["CONSULTANT_ADMIN"]}
          component={ConsultantStaff}
        />
      ),
      route: PrivateRoute,
    },
  ],
};

const ForexRoutes = {
  path: "/forex",
  name: "Forex data",
  route: PrivateRoute,
  roles: ["CONSULTANT_ADMIN"],
  icon: "users",
  children: [
    {
      path: "/forex/consultants/transactions",
      name: "Staff",
      element: (
        <PrivateRoute
          roles={["CONSULTANT_ADMIN", "CONSULTANT_STAFF"]}
          component={TransactionsConsultant}
        />
      ),
      route: PrivateRoute,
    },
    {
      path: "/forex/consultants/commissions",
      name: "Staff",
      element: (
        <PrivateRoute
          roles={["CONSULTANT_ADMIN"]}
          component={CommissionsConsultant}
        />
      ),
      route: PrivateRoute,
    },
    {
      path: "/forex/transactions",
      name: "Staff",
      element: (
        <PrivateRoute
          roles={["CRED_ADMIN", "CRED_STAFF"]}
          component={TransactionsAdmin}
        />
      ),
      route: PrivateRoute,
    },
    {
      path: "/forex/commissions",
      name: "Staff",
      element: (
        <PrivateRoute roles={["CRED_ADMIN"]} component={CommissionsAdmin} />
      ),
      route: PrivateRoute,
    },
    {
      path: "/forex/settlements",
      name: "Staff",
      element: (
        <PrivateRoute roles={["CRED_ADMIN"]} component={CommisionSummary} />
      ),
      route: PrivateRoute,
    },
    {
      path: "/forex/commisions_report",
      name: "Staff",
      element: (
        <PrivateRoute roles={["CRED_ADMIN"]} component={ReportSection} />
      ),
      route: PrivateRoute,
    },
  ],
};

const EbixStaffRoutes = {
  path: "/ebix_staff",
  name: "Ebix Data",
  route: PrivateRoute,
  roles: ["EBIX_STAFF"],
  icon: "users",
  children: [
    {
      path: "/ebix_staff/students_list",
      name: "Staff",
      element: (
        <PrivateRoute roles={["EBIX_STAFF"]} component={EbixStafftudentsList} />
      ),
      route: PrivateRoute,
    },
    {
      path: "/ebix_staff/students/:id",
      name: "Staff",
      element: (
        <PrivateRoute roles={["EBIX_STAFF"]} component={EbixStafftudent} />
      ),
      route: PrivateRoute,
    },
    {
      path: "/ebix_staff/swift_copies",
      name: "Staff",
      element: (
        <PrivateRoute roles={["EBIX_STAFF"]} component={EbixSwiftCopyList} />
      ),
      route: PrivateRoute,
    },
  ],
};

const profileRoutes = {
  path: "/profile",
  name: "Profile",
  route: PrivateRoute,
  roles: [
    "CONSULTANT_ADMIN",
    "SUPER_USER",
    "CRED_STAFF",
    "CONSULTANT",
    "CONSULTANT_STAFF",
    "STUDENT",
    "CRED_ADMIN",
  ],
  icon: "users",
  children: [
    {
      path: "/profile/details",
      name: "Profile",
      element: (
        <PrivateRoute
          roles={[
            "CONSULTANT_ADMIN",
            "SUPER_USER",
            "CRED_STAFF",
            "CONSULTANT",
            "CONSULTANT_STAFF",
            "STUDENT",
            "CRED_ADMIN",
          ]}
          component={ProfilePage}
        />
      ),
      route: PrivateRoute,
    },
  ],
};

const superAdminRoutes = {
  path: "/status",
  name: "Status",
  route: PrivateRoute,
  roles: ["SUPER_USER", "CRED_ADMIN"],
  icon: "users",
  children: [
    {
      path: "/status/status_management",
      name: "Status",
      element: (
        <PrivateRoute
          roles={["SUPER_USER", "CRED_ADMIN"]}
          component={ApplicationStatusManagement}
        />
      ),
      route: PrivateRoute,
    },
    {
      path: "/status/loan_status",
      name: "Loan Status",
      element: (
        <PrivateRoute
          roles={["SUPER_USER", "CRED_ADMIN"]}
          component={LoanStatus}
        />
      ),
      route: PrivateRoute,
    },
    {
      path: "/status/internal_status",
      name: "Internal Status",
      element: (
        <PrivateRoute
          roles={["SUPER_USER", "CRED_ADMIN"]}
          component={InternalStatus}
        />
      ),
      route: PrivateRoute,
    },
    {
      path: "/apps/closed-tickets",
      name: "Loan Status",
      element: (
        <PrivateRoute
          roles={[
            "CRED_ADMIN",
            "SUPER_USER",
            "CONSULTANT_ADMIN",
            "CONSULTANT_STAFF",
            "CRED_STAFF",
          ]}
          component={ClosedTickets}
        />
      ),
      route: PrivateRoute,
    },
  ],
};

const appRoutes = [crmAppRoutes, profileRoutes];

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
  {
    path: "/student/delete-data",
    name: "forbidden",
    element: <StudentLogin />,
    route: Route,
  },
  {
    path: "*",
    name: "not-found",
    element: <NotFound />,
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
const authProtectedRoutes = [
  dashboardRoutes,
  ...appRoutes,
  userRoutes,
  consultantRoutes,
  ForexRoutes,
  EbixStaffRoutes,
  credadminRoutes,
  superAdminRoutes,
];
const publicRoutes = [...authRoutes, ...otherPublicRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);

export {
  publicRoutes,
  authProtectedRoutes,
  authProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
};
