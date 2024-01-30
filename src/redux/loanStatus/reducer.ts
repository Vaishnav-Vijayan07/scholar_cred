// apicore
import { showErrorAlert, showSuccessAlert } from "../../constants/alerts";
import { APICore } from "../../helpers/api/apiCore";

// constants
import { LoanStatusActionTypes } from "./constants";

const INIT_STATE = {
  status: [],
  loading: false,
  initialLoading: false,
  error: null,
};

interface StatusData {
  id: string;
  status_name: string;
  status_description: string;
}

export interface StatusActionType {
  type:
    | LoanStatusActionTypes.API_RESPONSE_SUCCESS
    | LoanStatusActionTypes.API_RESPONSE_ERROR
    | LoanStatusActionTypes.GET_LOAN_STATUS
    | LoanStatusActionTypes.ADD_LOAN_STATUS
    | LoanStatusActionTypes.UPDATE_LOAN_STATUS
    | LoanStatusActionTypes.DELETE_LOAN_STATUS;
  payload: {
    actionType?: string;
    data?: StatusData | {};
    error?: string;
  };
}

interface State {
  l?: StatusData | {};
  loading?: boolean;
  value?: boolean;
}

const LoanStatus = (state: State = INIT_STATE, action: StatusActionType): any => {
  switch (action.type) {
    case LoanStatusActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case LoanStatusActionTypes.GET_LOAN_STATUS: {
          return {
            ...state,
            status: action.payload.data,
            initialLoading: false,
            loading: false,
            error: null,
          };
        }

        case LoanStatusActionTypes.ADD_LOAN_STATUS: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }
        case LoanStatusActionTypes.UPDATE_LOAN_STATUS: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }
        case LoanStatusActionTypes.DELETE_LOAN_STATUS: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }
        default:
          return { ...state };
      }

    case LoanStatusActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case LoanStatusActionTypes.GET_LOAN_STATUS: {
          return {
            ...state,
            error: action.payload.error,
            initialLoading: false,
            loading: false,
          };
        }
        case LoanStatusActionTypes.ADD_LOAN_STATUS: {
          showErrorAlert(action.payload.error);
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }
        case LoanStatusActionTypes.UPDATE_LOAN_STATUS: {
          showErrorAlert(action.payload.error);
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }
        case LoanStatusActionTypes.DELETE_LOAN_STATUS: {
          showErrorAlert(action.payload.error);
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }
        default:
          return { ...state };
      }

    case LoanStatusActionTypes.GET_LOAN_STATUS:
      return { ...state, loading: true, initialLoading: true };
    case LoanStatusActionTypes.ADD_LOAN_STATUS:
      return { ...state, loading: true };
    case LoanStatusActionTypes.UPDATE_LOAN_STATUS:
      return { ...state, loading: true };
    default:
      return { ...state };
  }
};

export default LoanStatus;
