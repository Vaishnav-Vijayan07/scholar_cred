// constants
import { AdminActionTypes } from "./constants";

export interface AdminActionType {
  type:
    | AdminActionTypes.API_RESPONSE_SUCCESS
    | AdminActionTypes.API_RESPONSE_ERROR
    | AdminActionTypes.EDIT_ADMIN_USER
    | AdminActionTypes.CREATE_ADMIN_USER
    | AdminActionTypes.GET_ADMIN_USERS
    | AdminActionTypes.GET_ADMIN_USERS_BY_ID
    | AdminActionTypes.DELETE_ADMIN_USERS;
  payload: {} | string;
}

interface AdminUserDetails {
  username: string;
  password_hash: string;
  email: string;
  full_name: string;
  user_type_id: number;
  created_by: number;
  consultant_id: number;
}

// common success
export const authApiResponseSuccess = (
  actionType: string,
  data: AdminUserDetails | {}
): AdminActionType => ({
  type: AdminActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const authApiResponseError = (
  actionType: string,
  error: string
): AdminActionType => ({
  type: AdminActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const createAminUsers = (
  username: string,
  password_hash: string,
  email: string,
  full_name: string,
  user_type_id: number,
  created_by: number,
  consultant_id: number
): AdminActionType => ({
  type: AdminActionTypes.CREATE_ADMIN_USER,
  payload: {
    username,
    password_hash,
    email,
    full_name,
    user_type_id,
    created_by,
    consultant_id,
  },
});
export const deleteAdminUsers = (id: number): AdminActionType => ({
  type: AdminActionTypes.DELETE_ADMIN_USERS,
  payload: { id },
});
export const editAdminUsers = (full_name: string): AdminActionType => ({
  type: AdminActionTypes.EDIT_ADMIN_USER,
  payload: { full_name },
});

export const getAdminUsers = (): AdminActionType => ({
  type: AdminActionTypes.GET_ADMIN_USERS,
  payload: {},
});

export const getAdminUsersById = (id: number): AdminActionType => ({
  type: AdminActionTypes.GET_ADMIN_USERS_BY_ID,
  payload: { id },
});
