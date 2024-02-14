import { APICore } from "./apiCore";

const api = new APICore();

function getTicketDetails(ticket_id: any) {
  const baseUrl = "/getAllTicketById";
  return api.get(`${baseUrl}`, { ticket_id });
}

function getTicketComments(tickets_id: any) {
  const baseUrl = "/getTicketCommentsId";
  return api.get(`${baseUrl}`, { tickets_id });
}

function updateTicketComments(params: { tickets_id: any; comment: string }) {
  const baseUrl = "/addTicketComment";
  return api.create(`${baseUrl}`, params);
}

export { getTicketDetails, getTicketComments ,updateTicketComments};
