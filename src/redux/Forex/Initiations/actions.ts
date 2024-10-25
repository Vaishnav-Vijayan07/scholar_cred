import { NavigateFunction } from "react-router-dom";
import { ForexInitiationTypes } from "./constants";

export const forexInitApiSuccess = (actionType: string, data: string) => ({
  type: ForexInitiationTypes.API_SUCCESS,
  payload: { actionType, data },
});

export const forexInitApiError = (actionType: string, error: string) => ({
  type: ForexInitiationTypes.API_ERROR,
  payload: { actionType, error },
});

export const getInitData = () => ({
  type: ForexInitiationTypes.GET_INIT_DATA,
  payload: {},
});

export const addInitData = (student_id: string | number, navigate: NavigateFunction) => ({
  type: ForexInitiationTypes.ADD_INIT_DATA,
  payload: {
    student_id,
    navigate,
  },
});

export const updateInitData = (status: string, student_id: string | number) => ({
  type: ForexInitiationTypes.UPDATE_INIT_STATUS,
  payload: {
    status,
    student_id,
  },
});
