import { combineReducers } from "redux";

import Auth from "./auth/reducers";
import Layout from "./layout/reducers";
import ConsultantReducer from "./consultant/reducer";
import AdminStaff from "./adminStaffs/reducer";

export default combineReducers({
  Auth,
  Layout,
  ConsultantReducer,
  AdminStaff,
});
