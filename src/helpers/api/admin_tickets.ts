import { APICore } from "./apiCore";
const api = new APICore();

function getAdminTickets(status: any) {
  const baseUrl = "/tickets_all";
  const qeuryParams = { status: status };
  return api.get(`${baseUrl}`, { params: qeuryParams });
}

function getTicketStatus() {
  const baseUrl = "/getTicketStatus";
  return api.get(`${baseUrl}`, {});
}

function updateAdminTicketStatus(status_id: number, ticket_id: string) {
  const baseUrl = "updateTicketStatus";
  console.log(status_id, ticket_id);
  return api.create(`${baseUrl}`, { status_id, ticket_id });
}

function getadminTicketsCount() {
  const baseUrl = "/getTickersCount";
  return api.create(`${baseUrl}`, {});
}

export {
  getAdminTickets,
  getTicketStatus,
  getadminTicketsCount,
  updateAdminTicketStatus,
};
