// constants
import { AuthActionTypes } from "./constants";

export interface AuthActionType {
  type:
    | AuthActionTypes.API_RESPONSE_SUCCESS
    | AuthActionTypes.API_RESPONSE_ERROR
    | AuthActionTypes.LOGIN_USER
    | AuthActionTypes.LOGOUT_USER
  payload: {} | string;
}
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

// Common success
export const authApiResponseSuccess = (
  actionType: string,
  data: UserData | {}
): AuthActionType => ({
  type: AuthActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

// Common error
export const authApiResponseError = (
  actionType: string,
  error: string
): AuthActionType => ({
  type: AuthActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

// Login user
export const loginUser = (username: string, password: string): AuthActionType => ({
  type: AuthActionTypes.LOGIN_USER,
  payload: { username, password },
});



// Logout user
export const logoutUser = (): AuthActionType => ({
  type: AuthActionTypes.LOGOUT_USER,
  payload: {},
});


