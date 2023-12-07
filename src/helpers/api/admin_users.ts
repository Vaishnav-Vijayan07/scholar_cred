import { APICore } from "./apiCore";

const api = new APICore();

// account
function createAdminUsers(params: { username: string; password_hash: string; email: string; full_name: string; user_type_id: number; created_by: number }) {
  const baseUrl = "/create_admin_user/";
  return api.create(`${baseUrl}`, params);
}

// account
function editAdminUsers(
  id: number,
  params: {
    username: string;
    password_hash: string;
    email: string;
    full_name: string;
    user_type_id: number;
    created_by: number;
  }
) {
  const baseUrl = "/edit_admin_user";
  return api.update(`${baseUrl}?id=${id}`, params);
}
function getCredAdminUsers() {
  const baseUrl = "/cred_admin_users/";
  return api.get(`${baseUrl}`, {});
}
function getAdminUsersById(id: number) {
  const baseUrl = "/admin_users_by_userid/";
  return api.get(`${baseUrl}?id=${id}`, {});
}
function deleteAdminUsers(id: number) {
  const baseUrl = "/delete_admin_user";
  return api.delete(`${baseUrl}?id=${id}`);
}

function resetPassword(username: string) {
  const baseUrl = "/reset_password";
  return api.create(`${baseUrl}`, { username });
}

export { createAdminUsers, editAdminUsers, getCredAdminUsers, getAdminUsersById, deleteAdminUsers, resetPassword };
