import { ForexTypes } from "./constants";

export const forexApiSuccess = (actionType: string, data: string) => ({
  type: ForexTypes.API_SUCCESS,
  payload: { actionType, data },
});

export const forexApiError = (actionType: string, error: string) => ({
  type: ForexTypes.API_ERROR,
  payload: { actionType, error },
});

export const getForexData = () => ({
  type: ForexTypes.GET_FOREX_DATA,
  payload: {},
});

export const getCommisions = () => ({
  type: ForexTypes.GET_COMMISIONS,
  payload: {},
});
