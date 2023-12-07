// constants
import { AdminStaffActionTypes } from "./constants";

export interface AdminStaffActionType {
  type:
    | AdminStaffActionTypes.API_RESPONSE_SUCCESS
    | AdminStaffActionTypes.API_RESPONSE_ERROR
    | AdminStaffActionTypes.API_RESPONSE_SUCCESS
    | AdminStaffActionTypes.DELETE_ADMIN_STAFF
    | AdminStaffActionTypes.EDIT_ADMIN_STAFF
    | AdminStaffActionTypes.CREATE_ADMIN_STAFF
    | AdminStaffActionTypes.GET_ADMIN_STAFF
    | AdminStaffActionTypes.GET_ADMIN_STAFF_BY_ID;
  payload: {} | string;
}
interface AdminStaffData {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  image: string;
  employee_id: string;
  created_by: number;
}

// Common success
export const adminStaffApiResponseSuccess = (actionType: string, data: AdminStaffData | {}): AdminStaffActionType => ({
  type: AdminStaffActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

// Common error
export const adminStaffApiResponseError = (actionType: string, error: string): AdminStaffActionType => ({
  type: AdminStaffActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getAdminStaff = (): AdminStaffActionType => ({
  type: AdminStaffActionTypes.GET_ADMIN_STAFF,
  payload: {},
});
export const getadminStaffById = (data: AdminStaffData | {}): AdminStaffActionType => ({
  type: AdminStaffActionTypes.GET_ADMIN_STAFF_BY_ID,
  payload: { data },
});

export const createadminStaff = (
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  phone: string,
  image: string,
  employee_id: string,
  created_by: number
): AdminStaffActionType => ({
  type: AdminStaffActionTypes.CREATE_ADMIN_STAFF,
  payload: {
    first_name,
    last_name,
    username,
    email,
    phone,
    image,
    employee_id,
    created_by,
  },
});

export const editAdminStaff = (
  id: string,
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  phone: string,
  image: string,
  employee_id: string,
  created_by: number
): AdminStaffActionType => ({
  type: AdminStaffActionTypes.EDIT_ADMIN_STAFF,
  payload: {
    id,
    first_name,
    last_name,
    username,
    email,
    phone,
    image,
    employee_id,
    created_by,
  },
});

export const deleteAdminStaff = (id: string) => ({
  type: AdminStaffActionTypes.DELETE_ADMIN_STAFF,
  payload: { id },
});
