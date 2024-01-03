// apicore
import { showSuccessAlert } from "../../constants/alerts";

// constants
import { ConsultantStaffActionTypes } from "./constants";

const INIT_STATE = {
  consultantStaff: [],
  consultantStaffById: {},
  loading: false,
  initialLoading: false,
  error: null,
};

interface ConsultantStaffData {
  username: string;
  password_hash: string;
  email: string;
  full_name: string;
  user_type_id: string;
  consultant_id: string;
}

interface ConsultantActionType {
  type:
    | ConsultantStaffActionTypes.API_RESPONSE_SUCCESS
    | ConsultantStaffActionTypes.API_RESPONSE_ERROR
    | ConsultantStaffActionTypes.CREATE_CONSULTANT_STAFF
    | ConsultantStaffActionTypes.EDIT_CONSULTANT_STAFF
    | ConsultantStaffActionTypes.DELETE_CONSULTANT_STAFF
    | ConsultantStaffActionTypes.GET_CONSULTANT_STAFF
    | ConsultantStaffActionTypes.GET_CONSULTANT_STAFF_BY_ID;
  payload: {
    actionType?: string;
    data?: ConsultantStaffData | {};
    error?: string;
  };
}

interface State {
  consultantData?: ConsultantStaffData | {};
  loading?: boolean;
  value?: boolean;
}

const ConsultantAdmin = (state: State = INIT_STATE, action: ConsultantActionType): any => {
  switch (action.type) {
    case ConsultantStaffActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case ConsultantStaffActionTypes.CREATE_CONSULTANT_STAFF: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }

        case ConsultantStaffActionTypes.EDIT_CONSULTANT_STAFF: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }
        case ConsultantStaffActionTypes.GET_CONSULTANT_STAFF_BY_ID: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            consultantStaffById: action.payload.data,
          };
        }
        case ConsultantStaffActionTypes.GET_CONSULTANT_STAFF: {
          return {
            ...state,
            loading: false,
            consultantStaff: action.payload.data,
            initialLoading: false,
          };
        }
        case ConsultantStaffActionTypes.DELETE_CONSULTANT_STAFF: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }

        default:
          return { ...state };
      }

    case ConsultantStaffActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case ConsultantStaffActionTypes.CREATE_CONSULTANT_STAFF: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }

        case ConsultantStaffActionTypes.EDIT_CONSULTANT_STAFF: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }

        case ConsultantStaffActionTypes.GET_CONSULTANT_STAFF: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
            consultantStaff: [],
          };
        }

        case ConsultantStaffActionTypes.GET_CONSULTANT_STAFF_BY_ID: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
            consultantStaffById: [],
          };
        }

        default:
          return { ...state };
      }

    case ConsultantStaffActionTypes.CREATE_CONSULTANT_STAFF:
      return { ...state, loading: true };

    case ConsultantStaffActionTypes.EDIT_CONSULTANT_STAFF:
      return { ...state, loading: true };

    case ConsultantStaffActionTypes.GET_CONSULTANT_STAFF:
      return { ...state, loading: true, initialLoading: true };

    case ConsultantStaffActionTypes.GET_CONSULTANT_STAFF_BY_ID:
      return { ...state, loading: true, initialLoading: true };

    case ConsultantStaffActionTypes.DELETE_CONSULTANT_STAFF:
      return { ...state, loading: true };

    default:
      return { ...state };
  }
};
export default ConsultantAdmin;
