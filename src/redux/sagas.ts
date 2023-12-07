import { all } from "redux-saga/effects";

import authSaga from "./auth/saga";
import layoutSaga from "./layout/saga";
import consultantSaga from "./consultant/saga";
import AdminStaffSaga from "./adminStaffs/saga";
import consultantStaffSaga from "./consultantAdmin/saga";
import StudentSaga from "./students/saga";
import credAdminUsersSaga from "./admin_users/saga";

export default function* rootSaga() {
  yield all([authSaga(), layoutSaga(), consultantSaga(), AdminStaffSaga(), consultantStaffSaga(), StudentSaga(), credAdminUsersSaga()]);
}
