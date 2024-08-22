import { APICore } from "./apiCore";

const api = new APICore();

function getForexDataApi() {
  const baseUrl = "/forex/transactions";
  return api.get(`${baseUrl}`, {});
}

function getForexCommisionsApi() {
  const baseUrl = "/forex/commisions";
  return api.get(`${baseUrl}`, {});
}

function getSettlementsApi(year: number, month: number) {
  const baseUrl = `/forex/summary_commisions/${year}/${month}`;
  return api.get(`${baseUrl}`, {});
}

function getReportsApi(year: number, month: number, consultants: any) {
  const baseUrl = `/forex/report_data`;
  return api.create(`${baseUrl}`, { year, month, consultants });
}

function getConsultantsApi() {
  const baseUrl = `/forex/report_data`;
  return api.get(`${baseUrl}`, {});
}

export {
  getForexDataApi,
  getForexCommisionsApi,
  getSettlementsApi,
  getReportsApi,
  getConsultantsApi,
};
