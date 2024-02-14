import axios from "axios";
import { APICore } from "./apiCore";

const api = new APICore();

function getConsultantStaff(consultant_id: string) {
  const baseUrl = "/get_consultant_staff";

  // return api.get(`${baseUrl}?consultant_id=${consultant_id}`, {});
  return axios.get(`${baseUrl}?consultant_id=${consultant_id}`);
}

function getConsultantStaffByAdmin() {
  const baseUrl = "/get_consultant_staff_by_admin";

  // return api.get(`${baseUrl}?consultant_id=${consultant_id}`, {});
  return api.get(`${baseUrl}`, {});
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
  file: File | null;
  employee_id: string;
  created_by: number;
  consultant_id: string;
}) {
  const baseUrl = "/create_consultant_staff";

  return api.createWithFile(`${baseUrl}`, params);
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
    file: File | null;
    employee_id: string;
    created_by: number;
    consultant_id: string;
  }
) {
  const baseUrl = "/edit_consultant_staff";
  return api.updateWithFile(`${baseUrl}?id=${id}`, params);
}

function deleteConsultantStaff(id: number) {
  const baseUrl = "/delete_consultant_staff";
  return api.delete(`${baseUrl}?id=${id}`);
}

export { createConsultantStaff, deleteConsultantStaff, getConsultantStaff, getConsultantStaffById, updateConsultantStaff, getConsultantStaffByAdmin };
