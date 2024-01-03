import { showSuccessAlert } from "../../constants/alerts";

// constants
import { ConsultantStaffActionTypes } from "./constants";

const INIT_STATE = {
  ConsultantStaff: [],
  loading: false,
  error: null,
  initialLoading: false,
};

interface Consultant {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  image: string;
  employee_id: string;
  created_by: number;
  consultant_id: string;
}

interface AdminStaffActionType {
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
    data?: Consultant | {};
    error?: string;
  };
}

interface State {
  ConsultantStaff?: Consultant | {};
  loading?: boolean;
  value?: boolean;
}

const ConsultantStaff = (state: State = INIT_STATE, action: AdminStaffActionType): any => {
  switch (action.type) {
    case ConsultantStaffActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case ConsultantStaffActionTypes.GET_CONSULTANT_STAFF: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            ConsultantStaff: action.payload.data,
          };
        }

        case ConsultantStaffActionTypes.GET_CONSULTANT_STAFF_BY_ID: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
          };
        }

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
          };
        }

        case ConsultantStaffActionTypes.GET_CONSULTANT_STAFF_BY_ID: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
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
export default ConsultantStaff;
