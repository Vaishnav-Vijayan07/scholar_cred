// constants
import { StatusActionTypes } from "./constants";

export interface StatusActionType {
  type:
    | StatusActionTypes.API_RESPONSE_SUCCESS
    | StatusActionTypes.API_RESPONSE_ERROR
    | StatusActionTypes.GET_STATUS
    | StatusActionTypes.ADD_STATUS
    | StatusActionTypes.UPDATE_STATUS
    | StatusActionTypes.DELETE_STATUS;
  payload: {} | string;
}

interface StatusData {
  id: string;
  status_name: string;
  status_description: string;
}

// common success
export const StatusApiResponseSuccess = (actionType: string, data: StatusData | {}): StatusActionType => ({
  type: StatusActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const StatusApiResponseError = (actionType: string, error: string): StatusActionType => ({
  type: StatusActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getStatus = (): StatusActionType => ({
  type: StatusActionTypes.GET_STATUS,
  payload: {},
});

export const addStatus = (status_name: string, status_description: string): StatusActionType => ({
  type: StatusActionTypes.ADD_STATUS,
  payload: {
    status_name,
    status_description,
  },
});

export const updateStatus = (id: string, status_name: string, status_description: string): StatusActionType => ({
  type: StatusActionTypes.UPDATE_STATUS,
  payload: {
    id,
    status_name,
    status_description,
  },
});

export const deleteStatus = (id: string): StatusActionType => ({
  type: StatusActionTypes.DELETE_STATUS,
  payload: { id },
});
