import { APICore } from "./apiCore";
const api = new APICore();
const baseurl = "/internalStatus";

function getInternalStatus() {
  return api.get(`${baseurl}`, {});
}

function addInternalStatus(params: any) {
  return api.create(`${baseurl}`, params);
}

function updateInternalStatus(
  id: string,
  params: {
    status_name: string;
    status_description: string;
  }
) {
  return api.update(`${baseurl}/${id}`, params);
}

function deleteInternalStatus(id: string) {
  return api.delete(`${baseurl}/${id}`);
}

export {
  getInternalStatus,
  deleteInternalStatus,
  addInternalStatus,
  updateInternalStatus,
};
