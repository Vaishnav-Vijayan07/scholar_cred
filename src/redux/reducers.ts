import { combineReducers } from "redux";

import Auth from "./auth/reducers";
import Layout from "./layout/reducers";
import ConsultantReducer from "./consultant/reducer";
import AdminStaff from "./adminStaffs/reducer";
import ConsultantAdmin from "./consultantAdmin/reducer";
import Students from "./students/reducer";
import CredAdminStates from "./admin_users/reducers";
import ConsultantStaff from "./consultantStaff/reducer";
import Status from "./statusManagement/reducer";
import Comments from "./comments/reducer";
import LoanStatus from "./loanStatus/reducer";

export default combineReducers({
  Auth,
  Layout,
  ConsultantReducer,
  AdminStaff,
  ConsultantStaff,
  Students,
  ConsultantAdmin,
  CredAdminStates,
  Status,
  Comments,
  LoanStatus,
});
