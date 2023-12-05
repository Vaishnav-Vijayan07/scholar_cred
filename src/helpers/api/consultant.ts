import { APICore } from "./apiCore";

const api = new APICore();

// account
function createConsultant(params: {
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
  const baseUrl = "/create_consultant";

  return api.create(`${baseUrl}`, params);
}

// account
function updateConsultant(
  id: number,
  params: {
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
  }
) {
  const baseUrl = "/edit_consultant_details";
  return api.update(`${baseUrl}?id=${id}`, params);
}

function getConsultants() {
  const baseUrl = "/get_consultants/";
  return api.get(`${baseUrl}`, {});
}

function deleteConsultant(id: number) {
  const baseUrl = "/delete_consultant";
  return api.delete(`${baseUrl}?id=${id}`);
}

function getConsultantsById(id: number) {
  const baseUrl = "/get_consultants_by_id";
  return api.get(`${baseUrl}?id=${id}`, {});
}

export { createConsultant, updateConsultant, getConsultants, deleteConsultant, getConsultantsById };
