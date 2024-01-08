// apicore
import { showErrorAlert, showSuccessAlert } from "../../constants/alerts";
import { APICore } from "../../helpers/api/apiCore";

// constants
import { StatusActionTypes } from "./constants";

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
    | StatusActionTypes.API_RESPONSE_SUCCESS
    | StatusActionTypes.API_RESPONSE_ERROR
    | StatusActionTypes.GET_STATUS
    | StatusActionTypes.ADD_STATUS
    | StatusActionTypes.UPDATE_STATUS
    | StatusActionTypes.DELETE_STATUS;
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

const Status = (state: State = INIT_STATE, action: StatusActionType): any => {
  switch (action.type) {
    case StatusActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case StatusActionTypes.GET_STATUS: {
          return {
            ...state,
            status: action.payload.data,
            initialLoading: false,
            loading: false,
            error: null,
          };
        }

        case StatusActionTypes.ADD_STATUS: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }
        case StatusActionTypes.UPDATE_STATUS: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }
        case StatusActionTypes.DELETE_STATUS: {
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

    case StatusActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case StatusActionTypes.GET_STATUS: {
          return {
            ...state,
            error: action.payload.error,
            initialLoading: false,
            loading: false,
          };
        }
        case StatusActionTypes.ADD_STATUS: {
          showErrorAlert(action.payload.error);
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }
        case StatusActionTypes.UPDATE_STATUS: {
          showErrorAlert(action.payload.error);
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }
        case StatusActionTypes.DELETE_STATUS: {
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

    case StatusActionTypes.GET_STATUS:
      return { ...state, loading: true, initialLoading: true };
    case StatusActionTypes.ADD_STATUS:
      return { ...state, loading: true };
    case StatusActionTypes.UPDATE_STATUS:
      return { ...state, loading: true };
    default:
      return { ...state };
  }
};

export default Status;
