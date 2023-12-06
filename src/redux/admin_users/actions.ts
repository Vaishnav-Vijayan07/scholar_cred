// constants
import { AdminActionTypes } from "./constants";

export interface AdminActionType {
  type:
    | AdminActionTypes.API_RESPONSE_SUCCESS
    | AdminActionTypes.API_RESPONSE_ERROR
    | AdminActionTypes.EDIT_CRED_ADMIN_USER
    | AdminActionTypes.CREATE_CRED_ADMIN_USER
    | AdminActionTypes.GET_CRED_ADMIN_USERS
    | AdminActionTypes.GET_CRED_ADMIN_USERS_BY_ID
    | AdminActionTypes.DELETE_CRED_ADMIN_USERS;
  payload: {} | string;
}

interface AdminUserDetails {
  username: string;
  password_hash: string;
  email: string;
  full_name: string;
  user_type_id: string;
  created_by: string;
}

// common success
export const credAuthApiResponseSuccess = (actionType: string, data: AdminUserDetails | {}): AdminActionType => ({
  type: AdminActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const credAuthApiResponseError = (actionType: string, error: string): AdminActionType => ({
  type: AdminActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const createAdminUsers = (username: string, password_hash: string, email: string, full_name: string, user_type_id: string, created_by: string): AdminActionType => ({
  type: AdminActionTypes.CREATE_CRED_ADMIN_USER,
  payload: {
    username,
    password_hash,
    email,
    full_name,
    user_type_id,
    created_by,
  },
});

export const getCredAdminUsers = (): AdminActionType => ({
  type: AdminActionTypes.GET_CRED_ADMIN_USERS,
  payload: {},
});

export const deleteAdminUsers = (id: string): AdminActionType => ({
  type: AdminActionTypes.DELETE_CRED_ADMIN_USERS,
  payload: { id },
});
export const editAdminUsers = (
  id: string,
  username: string,
  password_hash: string,
  email: string,
  full_name: string,
  user_type_id: string,
  created_by: string
): AdminActionType => ({
  type: AdminActionTypes.EDIT_CRED_ADMIN_USER,
  payload: { id, username, password_hash, email, full_name, user_type_id, created_by },
});

export const getAdminUsersById = (id: string): AdminActionType => ({
  type: AdminActionTypes.GET_CRED_ADMIN_USERS_BY_ID,
  payload: { id },
});
