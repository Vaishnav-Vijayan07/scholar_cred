// constants
import { EbixStaffActionTypes } from "./constants";

export interface AdminActionType {
  type:
    | EbixStaffActionTypes.API_RESPONSE_SUCCESS
    | EbixStaffActionTypes.API_RESPONSE_ERROR
    | EbixStaffActionTypes.CREATE_EBIX_STAFF
    | EbixStaffActionTypes.GET_EBIX_STAFF
    | EbixStaffActionTypes.GET_DOCS
    | EbixStaffActionTypes.UPLOAD_SWIFT
    | EbixStaffActionTypes.GET_SWIFT
    | EbixStaffActionTypes.GET_DETAILS
    | EbixStaffActionTypes.UPDATE_BOOKING_STATUS
    | EbixStaffActionTypes.DELETE_EBIX_STAFF;
  payload: {} | string;
}

interface EbixUserDetails {
  username: string;
  email: string;
  user_type_id: string;
  created_by: string;
}

// common success
export const ebixStaffResponseSuccess = (
  actionType: string,
  data: EbixUserDetails | {}
): AdminActionType => ({
  type: EbixStaffActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const ebixStaffResponseError = (
  actionType: string,
  error: string
): AdminActionType => ({
  type: EbixStaffActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const createEbixUsers = (
  username: string,
  email: string,
  user_type_id: string,
  created_by: string
): AdminActionType => ({
  type: EbixStaffActionTypes.CREATE_EBIX_STAFF,
  payload: {
    username,
    email,
    user_type_id,
    created_by,
  },
});

export const getEbixUsers = (): AdminActionType => ({
  type: EbixStaffActionTypes.GET_EBIX_STAFF,
  payload: {},
});

export const getDocs = (): AdminActionType => ({
  type: EbixStaffActionTypes.GET_DOCS,
  payload: {},
});

export const getSwiftDocs = (): AdminActionType => ({
  type: EbixStaffActionTypes.GET_SWIFT,
  payload: {},
});

export const uploadSwift = (
  file: File,
  forex_id: string,
  student_id: string
): AdminActionType => ({
  type: EbixStaffActionTypes.UPLOAD_SWIFT,
  payload: { file, forex_id, student_id },
});

export const getPayDetails = (forex_id: string): AdminActionType => ({
  type: EbixStaffActionTypes.GET_DETAILS,
  payload: { forex_id },
});

export const deleteEbixUsers = (id: string): AdminActionType => ({
  type: EbixStaffActionTypes.DELETE_EBIX_STAFF,
  payload: { id },
});

export const updateBookingStatus = (
  status: string,
  forex_id: string,
  student_id: string
): AdminActionType => ({
  type: EbixStaffActionTypes.UPDATE_BOOKING_STATUS,
  payload: { status, forex_id, student_id },
});
