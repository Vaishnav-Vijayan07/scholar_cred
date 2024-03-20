import axios from "axios";
import { APICore } from "./apiCore";

const api = new APICore();

// account
function login(params: { username: string; password: string }) {
  return axios.post(`/login`, params);
}

function logout() {
  const baseUrl = "/logout/";
  return api.create(`${baseUrl}`, {});
}

function signup(params: { fullname: string; email: string; password: string }) {
  const baseUrl = "/register/";
  return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: { username: string }) {
  // const baseUrl = "/forget_password";
  const baseUrl = "/reset_password";

  return api.create(`${baseUrl}`, params);
}

function changePassword(params: {
  old_passowrd: string;
  new_password: string;
  user_id: string;
}) {
  const baseUrl = "/change_password";
  return api.create(`${baseUrl}`, params);
}

function editProfileApi(params: {
  id: any;
  firstname: any;
  lastname: any;
  image: any;
}) {
  const baseUrl = "/edit_profile";
  return api.updateWithFile(`${baseUrl}?id=${params.id}`, params);
}


export {
  login,
  logout,
  signup,
  forgotPassword,
  changePassword,
  editProfileApi,
};
