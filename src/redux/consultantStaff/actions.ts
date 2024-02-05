// constants
import { ConsultantStaffActionTypes } from "./constants";

export interface ConsultantStaffsActionType {
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
  file: File | null;
  employee_id: string;
  created_by: number;
  consultant_id: string;
}

// Common success
export const ConsultantStaffsApiResponseSuccess = (actionType: string, data: AdminStaffData | {}): ConsultantStaffsActionType => ({
  type: ConsultantStaffActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

// Common error
export const ConsultantStaffsApiResponseError = (actionType: string, error: string): ConsultantStaffsActionType => ({
  type: ConsultantStaffActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getConsultantStaffs = (consultant_id: string): ConsultantStaffsActionType => ({
  type: ConsultantStaffActionTypes.GET_CONSULTANT_STAFF,
  payload: { consultant_id },
});
export const getConsultantStaffsById = (data: AdminStaffData | {}): ConsultantStaffsActionType => ({
  type: ConsultantStaffActionTypes.GET_CONSULTANT_STAFF_BY_ID,
  payload: { data },
});

export const createConsultantStaffs = (
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  phone: string,
  file: File | null,
  employee_id: string,
  created_by: number,
  consultant_id: string
): ConsultantStaffsActionType => ({
  type: ConsultantStaffActionTypes.CREATE_CONSULTANT_STAFF,
  payload: {
    first_name,
    last_name,
    username,
    email,
    phone,
    file,
    employee_id,
    created_by,
    consultant_id,
  },
});

export const editConsultantStaffs = (
  id: string,
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  phone: string,
  file: File | null,
  employee_id: string,
  created_by: number,
  consultant_id: string
): ConsultantStaffsActionType => ({
  type: ConsultantStaffActionTypes.EDIT_CONSULTANT_STAFF,
  payload: {
    id,
    first_name,
    last_name,
    username,
    email,
    phone,
    file,
    employee_id,
    created_by,
    consultant_id,
  },
});

export const deleteConsultantStaffs = (id: string, consultant_id: string) => ({
  type: ConsultantStaffActionTypes.DELETE_CONSULTANT_STAFF,
  payload: { id, consultant_id },
});
