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
export interface MyInitialState {
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

export const initialState = {
  id: "",
  company_name: "",
  business_address: "",
  email: "",
  phone: "",
  alternative_phone: "",
  gst: "",
  location: "",
  pin_code: "",
  pan_no: "",
};

export const initialValidationState = {
  id: "",
  company_name: "",
  business_address: "",
  email: "",
  phone: "",
  alternative_phone: "",
  gst: "",
  location: "",
  pin_code: "",
  pan_no: "",
};

export interface StaffTypes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  image: string;
  employee_id: string;
}

export const StaffInitialState = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  image: "",
  employee_id: "",
};

export const StaffInitialValidationState = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  image: "https://picsum.photos/id/0/367/267",
  employee_id: "",
};
