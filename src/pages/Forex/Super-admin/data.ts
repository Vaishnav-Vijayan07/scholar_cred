import { cred_admin_usertype, ebix_staff_usertype } from "../../../constants/constant_ids";

export interface AdminUsersType {
  id: string;
  username: string;
  email: string;
  user_type_id: string;
  created_by: string;
}


export const sizePerPageList = [
  {
    text: "5",
    value: 5,
  },
  {
    text: "10",
    value: 10,
  },
];

export const AdminInitialState = {
  id: "",
  username: "",
  email: "",
  user_type_id: ebix_staff_usertype,
  created_by: "1", //super admin
};

export const AdminValidationState = {
  id: "",
  username: "",
  email: "",
  user_type_id: "",
  created_by: "",
};
