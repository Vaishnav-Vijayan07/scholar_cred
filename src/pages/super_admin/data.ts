import { cred_admin_usertype } from "../../constants/constant_ids";

export interface AdminUsersType {
  id: string;
  username: string;
  password_hash: string;
  email: string;
  first_name: string;
  last_name: string;
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
  password_hash: "",
  email: "",
  last_name: "",
  first_name: "",
  user_type_id: cred_admin_usertype,
  created_by: "1", //super admin
};

export const AdminValidationState = {
  id: "",
  username: "",
  password_hash: "",
  email: "",
  first_name: "",
  last_name: "",
  user_type_id: "",
  created_by: "",
};
