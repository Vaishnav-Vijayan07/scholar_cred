// apicore
import { APICore } from "../../helpers/api/apiCore";

// constants
import { AdminActionTypes } from "./constants";

const api = new APICore();

const INIT_STATE = {
  credAdmin: []  
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
    credAdmin?: []
  };
}

interface State {
  user?: AdminUserData | {};
  loading?: boolean;
  value?: boolean;
}

const CredAdminStates = (
  state: State = INIT_STATE,
  action: AuthActionType
): any => {
  switch (action.type) {
    case AdminActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case AdminActionTypes.CREATE_CRED_ADMIN_USER: {
          return {
            ...state,
            user: action.payload.data,
            userLoggedIn: true,
            loading: false,
          };
        }
        case AdminActionTypes.GET_CRED_ADMIN_USERS: {
          return {
            ...state,
            loading: false,
            userSignUp: true,
          };
        }
        case AdminActionTypes.EDIT_CRED_ADMIN_USER: {
          return {
            ...state,
            user: null,
            loading: false,
            userLogout: true,
          };
        }
        case AdminActionTypes.GET_CRED_ADMIN_USERS_BY_ID: {
          return {
            ...state,
            resetPasswordSuccess: action.payload.data,
            loading: false,
            passwordReset: true,
          };
        }
        case AdminActionTypes.DELETE_CRED_ADMIN_USERS: {
          return {
            ...state,
            resetPasswordSuccess: action.payload.data,
            loading: false,
            passwordReset: true,
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
            userLoggedIn: false,
            loading: false,
          };
        }
        case AdminActionTypes.EDIT_CRED_ADMIN_USER: {
          return {
            ...state,
            registerError: action.payload.error,
            userSignUp: false,
            loading: false,
          };
        }
        case AdminActionTypes.GET_CRED_ADMIN_USERS: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            passwordReset: false,
          };
        }
        case AdminActionTypes.GET_CRED_ADMIN_USERS_BY_ID: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            passwordReset: false,
          };
        }
        case AdminActionTypes.DELETE_CRED_ADMIN_USERS: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            passwordReset: false,
          };
        }
        default:
          return { ...state };
      }

    case AdminActionTypes.CREATE_CRED_ADMIN_USER:
      return { ...state, loading: true, userLoggedIn: false };
    case AdminActionTypes.EDIT_CRED_ADMIN_USER:
      return { ...state, loading: true, userLogout: false };
    case AdminActionTypes.GET_CRED_ADMIN_USERS:
      return { ...state, loading: true, userLogout: false };

    case AdminActionTypes.GET_CRED_ADMIN_USERS_BY_ID:
      return { ...state, loading: true, userLogout: false };
    case AdminActionTypes.DELETE_CRED_ADMIN_USERS:
      return { ...state, loading: true, userLogout: false };
    default:
      return { ...state };
  }
};

export default CredAdminStates;
