// constants
import { ConsultantStaffActionTypes } from "./constants";

export interface AdminStaffActionType {
  type:
    | ConsultantStaffActionTypes.API_RESPONSE_SUCCESS
    | ConsultantStaffActionTypes.API_RESPONSE_ERROR
    | ConsultantStaffActionTypes.API_RESPONSE_SUCCESS
    | ConsultantStaffActionTypes.DELETE_CONSULTANT_STAFF
    | ConsultantStaffActionTypes.EDIT_CONSULTANT_STAFF
    | ConsultantStaffActionTypes.CREATE_CONSULTANT_STAFF
    | ConsultantStaffActionTypes.GET_CONSULTANT_STAFF
    | ConsultantStaffActionTypes.GET_CONSULTANT_STAFF_BY_ID;
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
  consultant_id: string;
}

// Common success
export const ConsultantStaffApiResponseSuccess = (actionType: string, data: AdminStaffData | {}): AdminStaffActionType => ({
  type: ConsultantStaffActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

// Common error
export const ConsultantStaffApiResponseError = (actionType: string, error: string): AdminStaffActionType => ({
  type: ConsultantStaffActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getConsultantStaff = (): AdminStaffActionType => ({
  type: ConsultantStaffActionTypes.GET_CONSULTANT_STAFF,
  payload: {},
});
export const getConsultantStaffById = (data: AdminStaffData | {}): AdminStaffActionType => ({
  type: ConsultantStaffActionTypes.GET_CONSULTANT_STAFF_BY_ID,
  payload: { data },
});

export const createConsultantStaff = (
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  phone: string,
  image: string,
  employee_id: string,
  created_by: number,
  consultant_id: string
): AdminStaffActionType => ({
  type: ConsultantStaffActionTypes.CREATE_CONSULTANT_STAFF,
  payload: {
    first_name,
    last_name,
    username,
    email,
    phone,
    image,
    employee_id,
    created_by,
    consultant_id,
  },
});

export const editConsultantStaff = (
  id: string,
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  phone: string,
  image: string,
  employee_id: string,
  created_by: number,
  consultant_id: string
): AdminStaffActionType => ({
  type: ConsultantStaffActionTypes.EDIT_CONSULTANT_STAFF,
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
    consultant_id,
  },
});

export const deleteConsultantStaff = (id: string) => ({
  type: ConsultantStaffActionTypes.DELETE_CONSULTANT_STAFF,
  payload: { id },
})
