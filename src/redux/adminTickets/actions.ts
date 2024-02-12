import { string } from "yup";
import { AdminTicketsActionTypes } from "./constants";

interface AdminTicketData {
  ticket_id: number;
  subjects_description: string;
  status_name: string;
  subject_name: string;
  student_first_name: string;
  student_last_name: string;
  admin_user_name: string | null;
  ticket_created_at: string; // It's a string as per the provided JSON data, but consider using Date if it's always in ISO format
  ticket_updated_at: string; // It's a string as per the provided JSON data, but consider using Date if it's always in ISO format
  subjects_id: number;
  status: number;
  student_id: number;
  updated_by: string | null;
}

interface AdminTicketActionType {
  type:
    | AdminTicketsActionTypes.API_RESPONSE_SUCCESS
    | AdminTicketsActionTypes.API_RESPONSE_ERROR
    | AdminTicketsActionTypes.GET_ADMIN_TICKETS
    | AdminTicketsActionTypes.GET_ADMIN_TICKET_STATUS
    | AdminTicketsActionTypes.UPDATE_ADMIN_TICKET_STATUS
    | AdminTicketsActionTypes.GET_ADMIN_TICKETS_COUNT;
  payload: {} | string;
}

export const adminTicketsApiResponseSuccess = (
  actionType: string,
  data: AdminTicketData | {}
): AdminTicketActionType => ({
  type: AdminTicketsActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

export const adminTicketsApiResponseError = (
  actionType: string,
  error: string
) => ({
  type: AdminTicketsActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getAdminTickets = (status: any): AdminTicketActionType => ({
  type: AdminTicketsActionTypes.GET_ADMIN_TICKETS,
  payload: { status },
});

export const getAdminTicketStatus = (): AdminTicketActionType => ({
  type: AdminTicketsActionTypes.GET_ADMIN_TICKET_STATUS,
  payload: {},
});

export const updateAdminTicketStatus = (
  status_id: any,
  ticket_id: any
): AdminTicketActionType => {
  console.log(status_id, ticket_id);

  return {
    type: AdminTicketsActionTypes.UPDATE_ADMIN_TICKET_STATUS,
    payload: { status_id, ticket_id },
  };
};

export const getAdminTicketsCount = (): AdminTicketActionType => ({
  type: AdminTicketsActionTypes.GET_ADMIN_TICKETS_COUNT,
  payload: {},
});
