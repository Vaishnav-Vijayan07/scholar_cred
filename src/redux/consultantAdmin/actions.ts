// constants
import { ConsultantStaffActionTypes } from "./constants";

export interface ConsultantStaffActionType {
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
interface ConsultantStaffData {
  username: string;
  password_hash: string;
  email: string;
  full_name: string;
  user_type_id: string;
  consultant_id: string;
}

// Common success
export const consultantAdminApiResponseSuccess = (actionType: string, data: ConsultantStaffData | {}): ConsultantStaffActionType => ({
  type: ConsultantStaffActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

// Common error
export const consultantAdminApiResponseError = (actionType: string, error: string): ConsultantStaffActionType => ({
  type: ConsultantStaffActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

//create consultant;

export const createConsultantAdmin = (username: string, email: string, full_name: string, user_type_id: string, consultant_id: string): ConsultantStaffActionType => ({
  type: ConsultantStaffActionTypes.CREATE_CONSULTANT_STAFF,
  payload: {
    username,
    email,
    full_name,
    user_type_id,
    consultant_id,
  },
});

//edit consultant

export const editConsultantAdmin = (id: string, username: string, email: string, full_name: string, user_type_id: string, consultant_id: string): ConsultantStaffActionType => ({
  type: ConsultantStaffActionTypes.EDIT_CONSULTANT_STAFF,
  payload: {
    id,
    username,
    email,
    full_name,
    user_type_id,
    consultant_id,
  },
});

//delete consultant

export const deleteConsultantAdmin = (id: string, user_type: string, consultant_id: string) => ({
  type: ConsultantStaffActionTypes.DELETE_CONSULTANT_STAFF,
  payload: { id, user_type, consultant_id },
});

export const getConsultantAdmin = (user_type: string, consultant_id: string): ConsultantStaffActionType => ({
  type: ConsultantStaffActionTypes.GET_CONSULTANT_STAFF,
  payload: { user_type, consultant_id },
});
export const getConsultantAdminById = (id: string): ConsultantStaffActionType => ({
  type: ConsultantStaffActionTypes.GET_CONSULTANT_STAFF_BY_ID,
  payload: { id },
});
