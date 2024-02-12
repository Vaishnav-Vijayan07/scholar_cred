// constants
import { LoanStatusActionTypes } from "./constants";

export interface LoanStatusActionType {
  type:
    | LoanStatusActionTypes.API_RESPONSE_SUCCESS
    | LoanStatusActionTypes.API_RESPONSE_ERROR
    | LoanStatusActionTypes.GET_LOAN_STATUS
    | LoanStatusActionTypes.ADD_LOAN_STATUS
    | LoanStatusActionTypes.UPDATE_LOAN_STATUS
    | LoanStatusActionTypes.DELETE_LOAN_STATUS;
  payload: {} | string;
}

interface StatusData {
  id: string;
  status_name: string;
  status_description: string;
}

// common success
export const LoanStatusApiResponseSuccess = (
  actionType: string,
  data: StatusData | {}
): LoanStatusActionType => ({
  type: LoanStatusActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const LoanStatusApiResponseError = (
  actionType: string,
  error: string
): LoanStatusActionType => ({
  type: LoanStatusActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getLoanStatus = (): LoanStatusActionType => ({
  type: LoanStatusActionTypes.GET_LOAN_STATUS,
  payload: {},
});

export const addLoanStatus = (
  status_name: string,
  status_description: string,
  is_visible: string | boolean,
  status_type: "Internal" | "External"
): LoanStatusActionType => ({
  type: LoanStatusActionTypes.ADD_LOAN_STATUS,
  payload: {
    status_name,
    status_description,
    status_type,
    is_visible,
  },
});

export const updateLoanStatus = (
  id: string,
  status_name: string,
  status_description: string,
  is_visible: string | boolean,
  status_type: "Internal" | "External"
): LoanStatusActionType => ({
  type: LoanStatusActionTypes.UPDATE_LOAN_STATUS,
  payload: {
    id,
    status_name,
    status_description,
    status_type,
    is_visible,
  },
});

export const deleteLoanStatus = (id: string): LoanStatusActionType => ({
  type: LoanStatusActionTypes.DELETE_LOAN_STATUS,
  payload: { id },
});
