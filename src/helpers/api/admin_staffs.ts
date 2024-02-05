import { APICore } from "./apiCore";

const api = new APICore();

function getAdminStaff() {
  const baseUrl = "/get_admin_staff/";
  return api.get(`${baseUrl}`, {});
}

function getAdminStaffById(id: number) {
  const baseUrl = "/get_admin_staff_by_id";
  return api.create(`${baseUrl}/${id}`, {});
}

// account
function createAdminStaff(params: {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  file: File | null;
  employee_id: string;
  created_by: number;
  consultant_id?: string;
}) {
  const baseUrl = "/create_admin_staff";

  return api.createWithFile(`${baseUrl}`, params);
}

// account
function updateAdminStaff(
  id: number,
  params: {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone: string;
    // image: string;
    file: File | null;
    employee_id: string;
    created_by: number;
    consultant_id?: string;
  }
) {
  const baseUrl = "/edit_admin_staff";
  return api.updateWithFile(`${baseUrl}?id=${id}`, params);
}

function deleteAdminStaff(id: number) {
  const baseUrl = "/delete_admin_staff";
  return api.delete(`${baseUrl}?id=${id}`);
}

export { getAdminStaff, getAdminStaffById, createAdminStaff, updateAdminStaff, deleteAdminStaff };
