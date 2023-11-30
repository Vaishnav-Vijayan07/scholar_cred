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
  image: "",
  employee_id: "",
};

export const StaffData = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "john@gmail.com",
    phone: "3456789456",
    image: "",
    employee_id: "123",
  },
  {
    id: "2",
    first_name: "John",
    last_name: "Doe",
    email: "john@gmail.com",
    phone: "3456789456",
    image: "",
    employee_id: "123",
  },
];

export const ConsultantData = [
  {
    id: "123456",
    company_name: "ABC Corporation",
    business_address: "123 Main Street",
    email: "abc@example.com",
    phone: "1234567890",
    alternative_phone: "9876543210",
    gst: "GST123456789",
    location: "Cityville",
    pin_code: "456789",
    pan_no: "ABCDE1234F",
  },
  {
    id: "987654",
    company_name: "XYZ Ltd",
    business_address: "456 Oak Avenue",
    email: "xyz@example.com",
    phone: "9876543210",
    alternative_phone: "1234567890",
    gst: "GST987654321",
    location: "Townsville",
    pin_code: "567890",
    pan_no: "ZYXWV5432P",
  },
];
