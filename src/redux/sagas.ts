import { all } from "redux-saga/effects";

import authSaga from "./auth/saga";
import layoutSaga from "./layout/saga";
import consultantSaga from "./consultant/saga";
import AdminStaffSaga from "./adminStaffs/saga";
import consultantAdminSaga from "./consultantAdmin/saga";
import StudentSaga from "./students/saga";
import credAdminUsersSaga from "./admin_users/saga";
import consultantStaffSaga from "./consultantStaff/saga";
import Status from "./statusManagement/saga";
import commentsSaga from "./comments/saga";
import loanStatusSaga from "./loanStatus/saga";
import AdminTicketsSaga from "./adminTickets/saga";
import internalStatusSaga from "./internalStatus/saga";
import TicketsSaga from "./tickets/saga";
import notificationSaga from "./notifications/saga";
import studentDetailsSaga from "./studentDetails/saga";
import forexSaga from "./Forex/saga";
import ebixStaffSaga from "./Ebix_staff/saga";
import forexReportSaga from "./Forex/Report/saga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    layoutSaga(),
    consultantAdminSaga(),
    consultantSaga(),
    AdminStaffSaga(),
    consultantStaffSaga(),
    StudentSaga(),
    credAdminUsersSaga(),
    Status(),
    commentsSaga(),
    loanStatusSaga(),
    internalStatusSaga(),
    AdminTicketsSaga(),
    TicketsSaga(),
    notificationSaga(),
    studentDetailsSaga(),
    forexSaga(),
    forexReportSaga(),
    ebixStaffSaga(),
  ]);
}
