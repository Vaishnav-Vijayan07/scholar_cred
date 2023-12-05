import { consultant_admin_usertype } from "../../../constants/constant_ids";

export interface OptionType {
  value: string;
  label: string;
}

export interface TableRecords {
  id: string;
  company_name: string;
  business_address: string;
  email: string;
  phone: string;
  alternative_phone: string;
  gst: string;
  location: string;
  pin_code: string;
  pan_no: string;
}

export const sizePerPageList = [
  {
    text: "5",
    value: 5,
  },
];

export interface UserTypes {
  consultant_staff_id: string;
  username: string;
  password_hash: string;
  email: string;
  full_name: string;
  user_type_id: string;
  created_by: string;
  consultant_id: string;
}

export const InitialState = {
  consultant_staff_id: "",
  username: "",
  password_hash: "",
  email: "",
  full_name: "",
  user_type_id: consultant_admin_usertype,
  created_by: "",
  consultant_id: "",
};

export const InitialValidationState = {
  username: "",
  password_hash: "",
  email: "",
  full_name: "",
  user_type_id: "",
  created_by: "",
  consultant_id: "",
};

export const UserData = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "john@gmail.com",
    password: "1234567",
  },
  {
    id: "2",
    first_name: "John",
    last_name: "Doe",
    email: "john@gmail.com",
    password: "lkjhgfgt8",
  },
];
