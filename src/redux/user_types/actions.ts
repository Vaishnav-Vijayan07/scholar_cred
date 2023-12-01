// constants
import { GetUserTypes } from "./constants";

export interface GetUserTypeAction {
  type:
    | GetUserTypes.API_RESPONSE_SUCCESS
    | GetUserTypes.API_RESPONSE_ERROR
    | GetUserTypes.GET_USER_TYPES;

  payload: {} | string;
}

// common success
export const authApiResponseSuccess = (
  actionType: string,
  data: {}
): GetUserTypeAction => ({
  type: GetUserTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const authApiResponseError = (
  actionType: string,
  error: string
): GetUserTypeAction => ({
  type: GetUserTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getUserTypes = (): GetUserTypeAction => ({
  type: GetUserTypes.GET_USER_TYPES,
  payload: {},
});
