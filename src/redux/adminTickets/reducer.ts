import { showSuccessAlert } from "../../constants/alerts";
import { AdminTicketsActionTypes } from "./constants";

const INIT_STATE = {
  adminTickets: [],
  adminTicketsStatus: [],
  adminTicketsCount: [],
  loading: false,
  initialLoading: true,
  error: null,
};

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

interface TicketStatus {
  id: number;
  ticketstatus: string;
  created_at: string;
  updated_at: string;
}

interface CountData {
  status_id: number;
  status_name: string;
  status_count: string;
}

interface AdminTicketActionType {
  type:
    | AdminTicketsActionTypes.API_RESPONSE_SUCCESS
    | AdminTicketsActionTypes.API_RESPONSE_ERROR
    | AdminTicketsActionTypes.GET_ADMIN_TICKETS
    | AdminTicketsActionTypes.GET_ADMIN_TICKET_STATUS
    | AdminTicketsActionTypes.GET_ADMIN_TICKETS_COUNT;
  payload: {
    actionType?: string;
    data?: AdminTicketData | TicketStatus | CountData | {};
    error?: string;
  };
}

interface State {
  adminTickets?: AdminTicketData | {};
  adminTicketsStatus?: AdminTicketData | {};
  adminTicketsCount?: CountData | {};
  loading?: boolean;
  value?: boolean;
}

const AdminTickets = (
  state: State = INIT_STATE,
  action: AdminTicketActionType
): any => {
  switch (action.type) {
    case AdminTicketsActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case AdminTicketsActionTypes.GET_ADMIN_TICKETS: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            adminTickets: action.payload.data,
          };
        }

        case AdminTicketsActionTypes.GET_ADMIN_TICKET_STATUS: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            adminTicketsStatus: action.payload.data,
          };
        }

        case AdminTicketsActionTypes.UPDATE_ADMIN_TICKET_STATUS: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading:false,
          };
        }

        case AdminTicketsActionTypes.GET_ADMIN_TICKETS_COUNT: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            adminTicketsCount: action.payload.data,
          };
        }

        default:
          return { ...state };
      }

    case AdminTicketsActionTypes.API_RESPONSE_ERROR: {
      switch (action.payload.actionType) {
        case AdminTicketsActionTypes.GET_ADMIN_TICKETS: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
          };
        }

        case AdminTicketsActionTypes.GET_ADMIN_TICKET_STATUS: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
          };
        }

        case AdminTicketsActionTypes.GET_ADMIN_TICKETS_COUNT: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
          };
        }

        default:
          return { ...state };
      }
    }

    case AdminTicketsActionTypes.GET_ADMIN_TICKETS: {
      return {
        ...state,
        loading: true,
        initialLoading: true,
      };
    }

    case AdminTicketsActionTypes.GET_ADMIN_TICKET_STATUS: {
      return {
        ...state,
        loading: true,
        initialLoading: true,
      };
    }

    case AdminTicketsActionTypes.GET_ADMIN_TICKETS_COUNT: {
      return {
        ...state,
        loading: true,
        initialLoading: true,
      };
    }

    default:
      return { ...state };
  }
};

export default AdminTickets;
