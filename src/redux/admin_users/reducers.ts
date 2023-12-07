// constants
import { showSuccessAlert } from "../../constants/alerts";
import { AdminActionTypes } from "./constants";

const INIT_STATE = {
  credAdmin: [],
  credAdminById: {},
  loading: false,
  error: null,
};

interface AdminUserData {
  id: number;
  username: string;
  password_hash: string;
  email: string;
  full_name: string;
  user_type_id: number;
  created_by: number;
  consultant_id: number;
}

interface AuthActionType {
  type:
    | AdminActionTypes.API_RESPONSE_SUCCESS
    | AdminActionTypes.API_RESPONSE_ERROR
    | AdminActionTypes.CREATE_CRED_ADMIN_USER
    | AdminActionTypes.EDIT_CRED_ADMIN_USER
    | AdminActionTypes.GET_CRED_ADMIN_USERS
    | AdminActionTypes.GET_CRED_ADMIN_USERS_BY_ID
    | AdminActionTypes.DELETE_CRED_ADMIN_USERS;
  payload: {
    actionType?: string;
    data?: AdminUserData | {};
    error?: string;
    credAdmin?: [];
  };
}

interface State {
  user?: AdminUserData | {};
  loading?: boolean;
  value?: boolean;
}

const CredAdminStates = (state: State = INIT_STATE, action: AuthActionType): any => {
  switch (action.type) {
    case AdminActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case AdminActionTypes.CREATE_CRED_ADMIN_USER: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }
        case AdminActionTypes.GET_CRED_ADMIN_USERS: {
          return {
            ...state,
            loading: false,
            credAdmin: action.payload.data,
          };
        }
        case AdminActionTypes.EDIT_CRED_ADMIN_USER: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }
        case AdminActionTypes.GET_CRED_ADMIN_USERS_BY_ID: {
          return {
            ...state,
            loading: false,
            credAdminById: action.payload.data,
          };
        }
        case AdminActionTypes.DELETE_CRED_ADMIN_USERS: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }
        case AdminActionTypes.RESET_ADMIN_PASSWORD: {
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

    case AdminActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case AdminActionTypes.CREATE_CRED_ADMIN_USER: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }
        case AdminActionTypes.EDIT_CRED_ADMIN_USER: {
          return {
            ...state,
            loading: false,
            error: action.payload.error,
          };
        }
        case AdminActionTypes.GET_CRED_ADMIN_USERS: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }
        case AdminActionTypes.GET_CRED_ADMIN_USERS_BY_ID: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }
        case AdminActionTypes.DELETE_CRED_ADMIN_USERS: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }
        case AdminActionTypes.RESET_ADMIN_PASSWORD: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }
        default:
          return { ...state };
      }

    case AdminActionTypes.CREATE_CRED_ADMIN_USER:
      return { ...state, loading: true };
    case AdminActionTypes.EDIT_CRED_ADMIN_USER:
      return { ...state, loading: true };
    case AdminActionTypes.GET_CRED_ADMIN_USERS:
      return { ...state, loading: true };

    case AdminActionTypes.GET_CRED_ADMIN_USERS_BY_ID:
      return { ...state, loading: true };
    case AdminActionTypes.DELETE_CRED_ADMIN_USERS:
      return { ...state, loading: true };
    default:
      return { ...state };
  }
};

export default CredAdminStates;
