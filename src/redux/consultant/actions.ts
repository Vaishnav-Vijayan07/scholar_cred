// constants
import { ConsultantActionTypes } from "./constants";

export interface ConsultantActionType {
  type:
    | ConsultantActionTypes.API_RESPONSE_SUCCESS
    | ConsultantActionTypes.API_RESPONSE_ERROR
    | ConsultantActionTypes.API_RESPONSE_SUCCESS
    | ConsultantActionTypes.DELETE_CONSULTANT
    | ConsultantActionTypes.EDIT_CONSULTANT
    | ConsultantActionTypes.CREATE_CONSULTANT
    | ConsultantActionTypes.GET_CONSULTANT
    | ConsultantActionTypes.GET_CONSULTANT_BY_ID;
  payload: {} | string;
}
interface ConsultantData {
  company_name: string;
  business_address: string;
  email: string;
  phone: string;
  image_url: string;
  alternative_phone: string;
  gst: string;
  location: string;
  pin_code: string;
  pan_no: string;
  created_by: number;
}

// Common success
export const consultantApiResponseSuccess = (actionType: string, data: ConsultantData | {}): ConsultantActionType => ({
  type: ConsultantActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

// Common error
export const consultantApiResponseError = (actionType: string, error: string): ConsultantActionType => ({
  type: ConsultantActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

//create consultant;

export const createConsultant = (
  company_name: string,
  business_address: string,
  email: string,
  phone: string,
  image_url: string,
  alternative_phone: string,
  gst: string,
  location: string,
  pin_code: string,
  pan_no: string,
  created_by: number
): ConsultantActionType => ({
  type: ConsultantActionTypes.CREATE_CONSULTANT,
  payload: {
    company_name,
    business_address,
    email,
    phone,
    image_url,
    alternative_phone,
    gst,
    location,
    pin_code,
    pan_no,
    created_by,
  },
});

//edit consultant

export const editConsultant = (
  id: string,
  company_name: string,
  business_address: string,
  email: string,
  phone: string,
  image_url: string,
  alternative_phone: string,
  gst: string,
  location: string,
  pin_code: string,
  pan_no: string,
  created_by: number
): ConsultantActionType => ({
  type: ConsultantActionTypes.EDIT_CONSULTANT,
  payload: {
    id,
    company_name,
    business_address,
    email,
    phone,
    image_url,
    alternative_phone,
    gst,
    location,
    pin_code,
    pan_no,
    created_by,
  },
});

//delete consultant

export const deleteConsultant = (id: string) => ({
  type: ConsultantActionTypes.DELETE_CONSULTANT,
  payload: { id },
});

export const getConsultants = (): ConsultantActionType => ({
  type: ConsultantActionTypes.GET_CONSULTANT,
  payload: {},
});
export const getConsultantsById = (data: ConsultantData | {}): ConsultantActionType => ({
  type: ConsultantActionTypes.GET_CONSULTANT_BY_ID,
  payload: { data },
});
