// apicore
import { showSuccessAlert } from "../../constants/alerts";
import { APICore } from "../../helpers/api/apiCore";

// constants
import { AuthActionTypes } from "./constants";

const api = new APICore();

const INIT_STATE = {
  user: api.getLoggedInUser(),
  loading: false,
};

interface UserData {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  token: string;
}

interface AuthActionType {
  type:
    | AuthActionTypes.API_RESPONSE_SUCCESS
    | AuthActionTypes.API_RESPONSE_ERROR
    | AuthActionTypes.LOGIN_USER
    | AuthActionTypes.LOGOUT_USER
    | AuthActionTypes.RESET
    | AuthActionTypes.EDIT_PROFILE
    | AuthActionTypes.GET_LATEST
    | AuthActionTypes.CHANGE_PASSWORD;
  payload: {
    actionType?: string;
    data?: any;
    error?: string;
  };
}

interface State {
  user?: UserData | {};
  loading?: boolean;
  value?: boolean;
}

const Auth = (state: State = INIT_STATE, action: AuthActionType): any => {
  switch (action.type) {
    case AuthActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case AuthActionTypes.LOGIN_USER: {
          return {
            ...state,
            user: action.payload.data,
            userLoggedIn: true,
            loading: false,
            error: false,
          };
        }
        case AuthActionTypes.SIGNUP_USER: {
          return {
            ...state,
            loading: false,
            userSignUp: true,
            error: false,
          };
        }
        case AuthActionTypes.LOGOUT_USER: {
          return {
            ...state,
            user: null,
            loading: false,
            userLogout: true,
            error: false,
          };
        }
        case AuthActionTypes.FORGOT_PASSWORD: {
          return {
            ...state,
            resetPasswordSuccess: action.payload.data,
            loading: false,
            passwordReset: true,
            error: false,
          };
        }
        case AuthActionTypes.CHANGE_PASSWORD: {
          showSuccessAlert(action.payload.data);

          return {
            ...state,
            loading: false,
            isPasswordChange: action.payload.data,
            error: null,
          };
        }
        case AuthActionTypes.EDIT_PROFILE: {
          showSuccessAlert(action.payload.data.message);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }
        // case AuthActionTypes.GET_LATEST: {
        //   return {
        //     ...state,
        //     loading: false,
        //     user: action.payload.data,
        //     error: null,
        //   };
        // }
        default:
          return { ...state };
      }

    case AuthActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case AuthActionTypes.LOGIN_USER: {
          return {
            ...state,
            error: action.payload.error,
            userLoggedIn: false,
            loading: false,
          };
        }
        case AuthActionTypes.SIGNUP_USER: {
          return {
            ...state,
            registerError: action.payload.error,
            userSignUp: false,
            loading: false,
          };
        }
        case AuthActionTypes.FORGOT_PASSWORD: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            passwordReset: false,
          };
        }
        case AuthActionTypes.CHANGE_PASSWORD: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }
        case AuthActionTypes.EDIT_PROFILE: {
          showSuccessAlert(action.payload.data.message);
          return {
            ...state,
            loading: false,
            error: action.payload.error,
          };
        }
        // case AuthActionTypes.GET_LATEST: {
        //   return {
        //     ...state,
        //     loading: false,
        //     error: action.payload.error,
        //   };
        // }
        default:
          return { ...state };
      }

    case AuthActionTypes.LOGIN_USER:
      return { ...state, loading: true, userLoggedIn: false };
    case AuthActionTypes.CHANGE_PASSWORD:
      return { ...state, loading: true, message: null };
    // case AuthActionTypes.GET_LATEST:
    //   return { ...state, loading: true, message: null };
    case AuthActionTypes.LOGOUT_USER:
      return { ...state, loading: true, userLogout: false };
    case AuthActionTypes.RESET:
      return {
        ...state,
        loading: false,
        error: false,
        userSignUp: false,
        userLoggedIn: false,
        passwordReset: false,
        passwordChange: false,
        resetPasswordSuccess: null,
      };
    default:
      return { ...state };
  }
};

export default Auth;
