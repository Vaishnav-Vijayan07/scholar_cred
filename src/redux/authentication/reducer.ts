// apicore
import { APICore } from "../../helpers/api/apiCore";

// constants
import { AuthActionTypes } from "./constants";

const api = new APICore();

const INIT_STATE = {
  user: api.getLoggedInUser(),
  loading: false,
};

interface UserData {
  user: {
    token: string;
    user_type: {
      id: number;
      user_type: string;
    };
    userId: number;
    username: string;
    email: string;
    full_name: string;
    user_type_id: number;
    created_by: number;
    last_login: string | null;
    is_active: boolean;
    consultant_id: number | null;
    staff_profile_id: number | null;
  };
}

interface AuthActionType {
  type:
    | AuthActionTypes.API_RESPONSE_SUCCESS
    | AuthActionTypes.API_RESPONSE_ERROR
    | AuthActionTypes.LOGIN_USER
    | AuthActionTypes.LOGOUT_USER
  payload: {
    actionType?: string;
    data?: UserData | {};
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
          };
        }
 
        case AuthActionTypes.LOGOUT_USER: {
          return {
            ...state,
            user: null,
            loading: false,
            userLogout: true,
          };
        }
     
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
       
        default:
          return { ...state };
      }

    case AuthActionTypes.LOGIN_USER:
      return { ...state, loading: true, userLoggedIn: false };
    case AuthActionTypes.LOGOUT_USER:
      return { ...state, loading: true, userLogout: false };

  }
};

export default Auth;
