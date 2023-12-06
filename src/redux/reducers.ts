import { combineReducers } from "redux";

import Auth from "./auth/reducers";
import Layout from "./layout/reducers";
import ConsultantReducer from "./consultant/reducer";
import AdminStaff from "./adminStaffs/reducer";
import ConsultantStaff from "./consultantStaffs/reducer";
import Students from "./students/reducer";

export default combineReducers({
  Auth,
  Layout,
  ConsultantReducer,
  AdminStaff,
  ConsultantStaff,
  Students,
});
