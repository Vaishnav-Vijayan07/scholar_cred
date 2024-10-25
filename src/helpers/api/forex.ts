import { APICore } from "./apiCore";

const api = new APICore();

function getForexDataApi(params: { from: any; to: any; status: any }) {
  console.log(params);

  const baseUrl = "/forex/transactions";
  return api.get(`${baseUrl}`, params);
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

function getForexInitDataApi() {
  const baseUrl = `forex_inititiation`;
  return api.get(`${baseUrl}`, {});
}

function updateForexInitDataApi(status: string, student_id: string | number) {
  const baseUrl = `forex_inititiation`;
  const dataTosend = {
    status,
    student_id,
  };
  return api.updatePatch(`${baseUrl}`, dataTosend);
}

function addForexInitApi(student_id: string | number) {
  const baseUrl = `forex_inititiation`;
  const dataTosend = {
    student_id,
  };
  return api.create(`${baseUrl}`, dataTosend);
}

export {
  getForexDataApi,
  getForexCommisionsApi,
  getSettlementsApi,
  getReportsApi,
  getConsultantsApi,
  getForexInitDataApi,
  updateForexInitDataApi,
  addForexInitApi,
};
