import { APICore } from "./apiCore";

const api = new APICore();

function getConsultantStaff(consultant_id: string) {
  const baseUrl = "/get_consultant_staff";
  return api.get(`${baseUrl}?consultant_id=${consultant_id}`, {});
}

function getConsultantStaffById(id: number) {
  const baseUrl = "/get_admin_staff_by_id";
  return api.create(`${baseUrl}/${id}`, {});
}

// account
function createConsultantStaff(params: {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  image: string;
  employee_id: string;
  created_by: number;
  consultant_id: string;
}) {
  const baseUrl = "/create_consultant_staff";

  return api.create(`${baseUrl}`, params);
}

// account
function updateConsultantStaff(
  id: number,
  params: {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone: string;
    image: string;
    employee_id: string;
    created_by: number;
    consultant_id: string;
  }
) {
  const baseUrl = "/edit_consultant_staff";
  return api.update(`${baseUrl}?id=${id}`, params);
}

function deleteConsultantStaff(id: number) {
  const baseUrl = "/delete_consultant_staff";
  return api.delete(`${baseUrl}?id=${id}`);
}

export { createConsultantStaff, deleteConsultantStaff, getConsultantStaff, getConsultantStaffById, updateConsultantStaff };
