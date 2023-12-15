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

// ----------------staff types ----------

export interface StaffTypes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  phone: string;
  file: string;
  employee_id: string;
}

export const StaffInitialState = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  username: "",
  file: "https://example.com/john-doe.jpg",
  employee_id: "",
  created_by: "1",
};

export const StaffInitialValidationState = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  phone: "",
  file: "https://picsum.photos/id/0/367/267",
  employee_id: "",
};

// ------------- Student -----------
export interface StudentDataTypes {
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth?: string | undefined;
  country_of_origin?: string;
  application_status?: string;
}

export const StudentInitialState = {
  student_id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  date_of_birth: "",
  country_of_origin: "",
  application_status: "Pending",
};

export const StudentValidationState = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  date_of_birth: "",
  country_of_origin: "",
  application_status: "",
};

// -------- Consultant Staffs --------------

export interface ConsultantStaffTypes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  phone: string;
  image: string;
  employee_id: string;
}

export const ConsultantStaffInitialState = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  username: "",
  image: "https://example.com/john-doe.jpg",
  employee_id: "",
  created_by: "1",
};

export const ConsultantStaffInitialValidationState = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  phone: "",
  image: "https://picsum.photos/id/0/367/267",
  employee_id: "",
};
