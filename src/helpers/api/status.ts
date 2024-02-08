import { APICore } from "./apiCore";

const api = new APICore();

const baseUrl = "/status";

//
function getAllStatus() {
  return api.get(`${baseUrl}`, {});
}

function addStatus(params: { status_name: string; status_description: string; status_type: "Internal" | "External"; is_visible: Boolean }) {
  return api.create(`${baseUrl}`, params);
}

function updateStatus(
  id: string,
  params: {
    status_name: string;
    status_description: string;
    status_type: "Internal" | "External";
    is_visible: Boolean;
  }
) {
  return api.update(`${baseUrl}/${id}`, params);
}

function deleteStatus(id: string) {
  return api.delete(`${baseUrl}/${id}`);
}

export { addStatus, deleteStatus, updateStatus, getAllStatus };
