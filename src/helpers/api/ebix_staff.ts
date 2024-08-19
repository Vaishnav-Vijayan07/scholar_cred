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

function getCredEbixUsersApi() {
  return api.get(`${baseUrl}`, {});
}

function getEbixDocsApi() {
  return api.get("/forex/ebix_staff/docs", {});
}

function getSwiftCopiesApi() {
  return api.get("/forex/ebix_staff/docs/swift_copies", {});
}

function getEbixPayApi(forex_id: string) {
  return api.get(`/forex/ebix_staff/${forex_id}`, {});
}

function deleteEbixUsersApi(id: number) {
  return api.delete(`${baseUrl}?id=${id}`);
}

function uploadSwiftCopyApi(params: {
  file: File;
  forex_id: string;
  student_id: string;
}) {
  return api.createWithFile("/forex/ebix_staff/docs", params);
}

export {
  createEbixUsersApi,
  getCredEbixUsersApi,
  deleteEbixUsersApi,
  getEbixDocsApi,
  getEbixPayApi,
  uploadSwiftCopyApi,
  getSwiftCopiesApi,
};
