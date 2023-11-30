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
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const InitialState = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

export const InitialValidationState = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
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
