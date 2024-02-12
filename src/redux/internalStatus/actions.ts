import { LoanStatusActionType } from "../actions";
import { InternalStatusActionTypes } from "./constants";

export interface InternalStatusActionType {
  type:
    | InternalStatusActionTypes.API_RESPONSE_SUCCESS
    | InternalStatusActionTypes.API_RESPONSE_ERROR
    | InternalStatusActionTypes.GET_INTERNAL_STATUS
    | InternalStatusActionTypes.ADD_INTERNAL_STATUS
    | InternalStatusActionTypes.UPDATE_INTERNAL_STATUS
    | InternalStatusActionTypes.DELETE_INTERNAL_STATUS;
  payload: {} | string;
}

export const InternalStatusApiResponseSuccess = (
  actionType: string,
  data: any
) => ({
  type: InternalStatusActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

export const InternalStatusApiResponseError = (
  actionType: string,
  error: any
) => ({
  type: InternalStatusActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getInternalStatus = (): InternalStatusActionType => ({
  type: InternalStatusActionTypes.GET_INTERNAL_STATUS,
  payload: {},
});

export const addInternalStatus = (
  status_name: string,
  status_description: string
): InternalStatusActionType => ({
  type: InternalStatusActionTypes.ADD_INTERNAL_STATUS,
  payload: { status_name, status_description },
});

export const updateInternalStatus = (
  id: string,
  status_name: string,
  status_description: string
): InternalStatusActionType => ({
  type: InternalStatusActionTypes.UPDATE_INTERNAL_STATUS,
  payload: { id, status_name, status_description },
});

export const deleteInternalStatus = (id: string): InternalStatusActionType => ({
  type: InternalStatusActionTypes.DELETE_INTERNAL_STATUS,
  payload: { id },
});
