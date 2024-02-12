import { showSuccessAlert } from "../../constants/alerts";

// constants
import { AdminStaffActionTypes } from "./constants";

const INIT_STATE = {
  adminStaff: [],
  loading: false,
  initialLoading: false,
  error: null,
};

interface AdminStaffData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  image: string;
  employee_id: string;
  created_by: number;
}

interface AdminStaffActionType {
  type:
    | AdminStaffActionTypes.API_RESPONSE_SUCCESS
    | AdminStaffActionTypes.API_RESPONSE_ERROR
    | AdminStaffActionTypes.CREATE_ADMIN_STAFF
    | AdminStaffActionTypes.EDIT_ADMIN_STAFF
    | AdminStaffActionTypes.DELETE_ADMIN_STAFF
    | AdminStaffActionTypes.GET_ADMIN_STAFF
    | AdminStaffActionTypes.GET_ADMIN_STAFF_BY_ID;
  payload: {
    actionType?: string;
    data?: AdminStaffData | {};
    error?: string;
  };
}

interface State {
  adminStaff?: AdminStaffData | {};
  loading?: boolean;
  value?: boolean;
}

const AdminStaff = (
  state: State = INIT_STATE,
  action: AdminStaffActionType
): any => {
  switch (action.type) {
    case AdminStaffActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case AdminStaffActionTypes.GET_ADMIN_STAFF: {          
          return {
            ...state,
            loading: false,
            initialLoading: false,
            adminStaff: action.payload.data,
          };
        }

        case AdminStaffActionTypes.GET_ADMIN_STAFF_BY_ID: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
          };
        }

        case AdminStaffActionTypes.CREATE_ADMIN_STAFF: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }

        case AdminStaffActionTypes.EDIT_ADMIN_STAFF: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }

        case AdminStaffActionTypes.DELETE_ADMIN_STAFF: {
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

    case AdminStaffActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case AdminStaffActionTypes.CREATE_ADMIN_STAFF: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }

        case AdminStaffActionTypes.EDIT_ADMIN_STAFF: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }

        case AdminStaffActionTypes.GET_ADMIN_STAFF: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
          };
        }

        case AdminStaffActionTypes.GET_ADMIN_STAFF_BY_ID: {
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

    case AdminStaffActionTypes.CREATE_ADMIN_STAFF:
      return { ...state, loading: true };

    case AdminStaffActionTypes.EDIT_ADMIN_STAFF:
      return { ...state, loading: true };

    case AdminStaffActionTypes.GET_ADMIN_STAFF:
      return { ...state, loading: true, initialLoading: true };

    case AdminStaffActionTypes.GET_ADMIN_STAFF_BY_ID:
      return { ...state, loading: true, initialLoading: true };

    case AdminStaffActionTypes.DELETE_ADMIN_STAFF:
      return { ...state, loading: true };

    default:
      return { ...state };
  }
};
export default AdminStaff;
