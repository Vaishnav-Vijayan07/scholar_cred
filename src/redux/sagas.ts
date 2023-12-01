import { all } from "redux-saga/effects";

import authSaga from "./auth/saga";
import layoutSaga from "./layout/saga";
import consultantSaga from "./consultant/saga";
import AdminStaffSaga from "./adminStaffs/saga";

export default function* rootSaga() {
  yield all([authSaga(), layoutSaga(), consultantSaga(), AdminStaffSaga()]);
}
