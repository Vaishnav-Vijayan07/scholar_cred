// constants
import { AuthActionTypes } from "./constants";

export interface AuthActionType {
  type:
    | AuthActionTypes.API_RESPONSE_SUCCESS
    | AuthActionTypes.API_RESPONSE_ERROR
    | AuthActionTypes.FORGOT_PASSWORD
    | AuthActionTypes.FORGOT_PASSWORD_CHANGE
    | AuthActionTypes.LOGIN_USER
    | AuthActionTypes.LOGOUT_USER
    | AuthActionTypes.RESET
    | AuthActionTypes.SIGNUP_USER
    | AuthActionTypes.EDIT_PROFILE
    | AuthActionTypes.GET_LATEST
    | AuthActionTypes.CHANGE_PASSWORD;
  payload: {} | string;
}

type StateType = {
  firstname: string;
  lastname: string;
  image: string | File;
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

// common success
export const authApiResponseSuccess = (
  actionType: string,
  data: UserData | {}
): AuthActionType => ({
  type: AuthActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const authApiResponseError = (
  actionType: string,
  error: string
): AuthActionType => ({
  type: AuthActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const loginUser = (
  username: string,
  password: string
): AuthActionType => ({
  type: AuthActionTypes.LOGIN_USER,
  payload: { username, password },
});

export const logoutUser = (): AuthActionType => ({
  type: AuthActionTypes.LOGOUT_USER,
  payload: {},
});

export const signupUser = (
  fullname: string,
  email: string,
  password: string
): AuthActionType => ({
  type: AuthActionTypes.SIGNUP_USER,
  payload: { fullname, email, password },
});

export const forgotPassword = (username: string): AuthActionType => ({
  type: AuthActionTypes.FORGOT_PASSWORD,
  payload: { username },
});

export const resetAuth = (): AuthActionType => ({
  type: AuthActionTypes.RESET,
  payload: {},
});

export const changePassword = (
  old_passowrd: string,
  new_password: string,
  user_id: string
): AuthActionType => ({
  type: AuthActionTypes.CHANGE_PASSWORD,
  payload: { old_passowrd, new_password, user_id },
});

export const editProfile = (data: StateType): AuthActionType => ({
  type: AuthActionTypes.EDIT_PROFILE,
  payload: { data },
});

export const getLatestData = () => ({
  type: AuthActionTypes.GET_LATEST,
  payload: {},
});
