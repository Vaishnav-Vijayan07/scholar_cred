import { AxiosResponse } from "axios";
import { APICore } from "./apiCore";

const api = new APICore();
const baseUrl = "/forex/ebix_staff";

// account
function createEbixUsersApi(params: {
  username: string;
  email: string;
  user_type_id: number;
  created_by: number;
}) {
  return api.create(`${baseUrl}`, params);
}

// account

function getCredEbixUsersApi() {
  return api.get(`${baseUrl}`, {});
}

function getEbixDocsApi() {
  return api.get("/forex/ebix_staff/docs", {});
}

function deleteEbixUsersApi(id: number) {
  return api.delete(`${baseUrl}?id=${id}`);
}

export {
  createEbixUsersApi,
  getCredEbixUsersApi,
  deleteEbixUsersApi,
  getEbixDocsApi,
};
