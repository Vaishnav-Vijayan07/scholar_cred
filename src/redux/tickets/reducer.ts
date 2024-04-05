import { showSuccessAlert, showWarningAlert } from "../../constants/alerts";
import { TicketsActionTypes } from "./constants";

const INIT_STATE = {
  Ticket: {},
  TicketComments: [],
  loading: false,
  initialLoading: true,
  error: null,
  commentsRefresh: false,
};

interface Ticket {
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

interface Comment {
  id: number;
  comment: string;
  tickets_id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  author: string;
  author_avatar: string | null;
}

interface TicketActionType {
  type:
    | TicketsActionTypes.API_RESPONSE_ERROR
    | TicketsActionTypes.API_RESPONSE_SUCCESS
    | TicketsActionTypes.GET_A_TICKET
    | TicketsActionTypes.REFRESH_COMMENTS
    | TicketsActionTypes.UPDATE_TICKET_COMMENT;
  payload: {
    actionType?: string;
    data?: Ticket | Comment | {};
    error?: string;
  };
}

const Tickets = (state = INIT_STATE, action: TicketActionType) => {
  switch (action.type) {
    case TicketsActionTypes.API_RESPONSE_SUCCESS: {
      switch (action.payload.actionType) {
        case TicketsActionTypes.GET_A_TICKET: {
          return {
            ...state,
            Ticket: action.payload.data,
            loading: false,
            initialLoading: false,
            error: null,
          };
        }

        case TicketsActionTypes.GET_TICKET_COMMENT: {
          return {
            ...state,
            TicketComments: action.payload.data,
            loading: false,
            initialLoading: false,
            error: null,
          };
        }

        case TicketsActionTypes.UPDATE_TICKET_COMMENT: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            initialLoading: false,
            error: null,
          };
        }

        default:
          return { ...state };
      }
    }
    case TicketsActionTypes.API_RESPONSE_ERROR: {
      switch (action.payload.actionType) {
        case TicketsActionTypes.GET_A_TICKET: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            error: action.payload.error,
          };
        }

        case TicketsActionTypes.GET_TICKET_COMMENT: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            error: action.payload.error,
          };
        }

        case TicketsActionTypes.UPDATE_TICKET_COMMENT: {
          showWarningAlert(action.payload.error);
          return {
            ...state,
            loading: false,
            initialLoading: false,
          };
        }

        default:
          return { ...state };
      }
    }
    case TicketsActionTypes.GET_A_TICKET: {
      return { ...state, initialLoading: true, loading: true };
    }
    case TicketsActionTypes.UPDATE_TICKET_COMMENT: {
      return { ...state, loading: true };
    }
    case TicketsActionTypes.REFRESH_COMMENTS: {
      return {
        ...state,
        commentsRefresh: !state.commentsRefresh,
      };
    }
    default:
      return { ...state };
  }
};

export default Tickets;
