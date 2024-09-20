import { APICore } from "./apiCore";
const api = new APICore();

function getAdminTickets(status: any) {
  const baseUrl = "/tickets_all";
  return api.get(`${baseUrl}`, { status});
}

function getTicketStatus() {
  const baseUrl = "/getTicketStatus";
  return api.get(`${baseUrl}`, {});
}

function updateAdminTicketStatus(status_id: number, ticket_id: string) {
  const baseUrl = "updateTicketStatus";
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
