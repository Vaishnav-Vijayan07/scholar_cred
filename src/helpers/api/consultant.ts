import { APICore } from "./apiCore";

const api = new APICore();

// account
function createConsultant(params:  {
   company_name: string;
  business_address: string;
  email: string;
  phone: string;
  image_url: string;
  alternative_phone: string;
  gst: string;
  location: string;
  pin_code: string;
  pan_no: string;
  created_by: number;
  }) {
  const baseUrl = "/create_consultant/";
  return api.create(`${baseUrl}`, params);
}

// account
function updateConsultant(id : number, params:  {
   company_name: string;
  business_address: string;
  email: string;
  phone: string;
  image_url: string;
  alternative_phone: string;
  gst: string;
  location: string;
  pin_code: string;
  pan_no: string;
  created_by: number;
  }) {
  const baseUrl = "/create_consultant/";
  return api.create(`${baseUrl}/${id}`, params);
}

function signup(params: { fullname: string; email: string; password: string }) {
  const baseUrl = "/register/";
  return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: { username: string }) {
  const baseUrl = "/forget-password/";
  return api.create(`${baseUrl}`, params);
}



export { createConsultant, updateConsultant };
