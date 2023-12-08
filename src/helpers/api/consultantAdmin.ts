import { APICore } from "./apiCore";

const api = new APICore();

// account
function createConsultantAdmin(params: { username: string; email: string; full_name: string; user_type_id: string; consultant_id: string }) {
  const baseUrl = "/create_admin_user";

  return api.create(`${baseUrl}`, params);
}

// account
function updateConsultantAdmin(
  id: number,
  params: {
    username: string;
    email: string;
    full_name: string;
    user_type_id: string;
    consultant_id: string;
  }
) {
  const baseUrl = "/edit_admin_user";
  return api.update(`${baseUrl}?id=${id}`, params);
}

function getConsultantAdmin(params: { user_type: string; consultant_id: string }) {
  const baseUrl = "/get_consultant_users/";
  return api.create(`${baseUrl}`, params);
}

function deleteConsultantAdmin(id: number) {
  const baseUrl = "/delete_admin_user";
  return api.delete(`${baseUrl}?id=${id}`);
}

function getConsultantAdminById(id: number) {
  const baseUrl = "/admin_users_by_userid";
  return api.get(`${baseUrl}?id=${id}`, {});
}

export { createConsultantAdmin, deleteConsultantAdmin, getConsultantAdmin, getConsultantAdminById, updateConsultantAdmin };
