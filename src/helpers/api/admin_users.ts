import { APICore } from "./apiCore";

const api = new APICore();

// account
function createAdminUsers(params: {
  username: string;
  password_hash: string;
  email: string;
  full_name: string;
  user_type_id: number;
  created_by: number;
  consultant_id: number;
}) {
  const baseUrl = "/create_admin_user/";
  return api.create(`${baseUrl}`, params);
}

// account
function editAdminUsers(
  id: number,
  params: {
    full_name: string;
  }
) {
  const baseUrl = "/edit_admin_user/";
  return api.create(`${baseUrl}/${id}`, params);
}
function getCredAdminUsers() {
  const baseUrl = "/cred_admin_users/";
  return api.get(`${baseUrl}`, {});
}
function getAdminUsersById(id: number, params: {}) {
  const baseUrl = "/edit_admin_user/";
  return api.create(`${baseUrl}/${id}`, params);
}
function deleteAdminUsers(id: number, params: {}) {
  const baseUrl = "/edit_admin_user/";
  return api.create(`${baseUrl}/${id}`, params);
}

export {
  createAdminUsers,
  editAdminUsers,
  getCredAdminUsers,
  getAdminUsersById,
  deleteAdminUsers,
};
