import { APICore } from "./apiCore";

const api = new APICore();

const baseUrl = "/loanStatus";

//
function getLoanStatus() {
  return api.get(`${baseUrl}`, {});
}

function addLoanStatus(params: {
  status_name: string;
  status_description: string;
  status_type: "Internal" | "External";
  is_visible: boolean | string;
}) {
  return api.create(`${baseUrl}`, params);
}

function updateLoanStatus(
  id: string,
  params: {
    status_name: string;
    status_description: string;
    status_type: "Internal" | "External";
    is_visible: boolean | string;
  }
) {
  return api.update(`${baseUrl}/${id}`, params);
}

function deleteLoanStatus(id: string) {
  return api.delete(`${baseUrl}/${id}`);
}

export { addLoanStatus, deleteLoanStatus, getLoanStatus, updateLoanStatus };
