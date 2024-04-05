import { TicketsActionTypes } from "./constants";

interface TicketsActionType {
  type:
    | TicketsActionTypes.API_RESPONSE_SUCCESS
    | TicketsActionTypes.API_RESPONSE_ERROR
    | TicketsActionTypes.GET_A_TICKET
    | TicketsActionTypes.GET_TICKET_COMMENT
    | TicketsActionTypes.UPDATE_TICKET_COMMENT;
  payload: {} | string;
}

interface TicketData {
  ticket_id: number;
  subjects_description: string;
  status_name: string;
  subject_name: string;
  subject_priority: string;
  student_first_name: string;
  student_last_name: string;
  admin_user_name: string | null;
  assigned_to_user_name: string;
  assigned_by_user_name: string | null;
  ticket_created_at: string;
  ticket_updated_at: string;
  subjects_id: number;
  status: number;
  student_id: number;
  updated_by: string | null;
}

export const TicketsApiResponseSuccess = (
  actionType: string,
  data: TicketData | {}
): TicketsActionType => ({
  type: TicketsActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

export const TicketsApiResponseError = (actionType: string, error: string) => ({
  type: TicketsActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getTicketDetails = (id: any) => ({
  type: TicketsActionTypes.GET_A_TICKET,
  payload: { id },
});

export const getTicketComments = (id: any) => ({
  type: TicketsActionTypes.GET_TICKET_COMMENT,
  payload: { id },
});

export const updateTicketComments = (id: any, comment: string) => ({
  type: TicketsActionTypes.UPDATE_TICKET_COMMENT,
  payload: { id, comment },
});

export const refreshComments = () => ({
  type: TicketsActionTypes.REFRESH_COMMENTS,
  payload: {},
})
