import { APICore } from "./apiCore";

const api = new APICore();

// account
function getUserTypes(params: {}) {
  const baseUrl = "/get_user_types/";
  return api.create(`${baseUrl}`, params);
}

// account

export { getUserTypes };
