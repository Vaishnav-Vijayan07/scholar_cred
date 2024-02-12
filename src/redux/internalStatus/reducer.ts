import {
  showErrorAlert,
  showSuccessAlert,
  showWarningAlert,
} from "../../constants/alerts";
import { InternalStatusActionTypes } from "./constants";

const INIT_STATE = {
  status: [],
  loading: false,
  initialLoading: true,
  error: null,
};

export interface StatusActionType {
  type:
    | InternalStatusActionTypes.API_RESPONSE_SUCCESS
    | InternalStatusActionTypes.API_RESPONSE_ERROR
    | InternalStatusActionTypes.GET_INTERNAL_STATUS
    | InternalStatusActionTypes.ADD_INTERNAL_STATUS
    | InternalStatusActionTypes.UPDATE_INTERNAL_STATUS
    | InternalStatusActionTypes.DELETE_INTERNAL_STATUS;
  payload: {
    actionType?: string;
    data?: any;
    error?: string;
    message?: any;
  };
}

const InternalStatus = (state = INIT_STATE, action: StatusActionType): any => {
  switch (action.type) {
    case InternalStatusActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case InternalStatusActionTypes.GET_INTERNAL_STATUS: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            status: action.payload.data,
          };
        }

        case InternalStatusActionTypes.ADD_INTERNAL_STATUS: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }

        case InternalStatusActionTypes.UPDATE_INTERNAL_STATUS: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }

        case InternalStatusActionTypes.DELETE_INTERNAL_STATUS: {
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

    case InternalStatusActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case InternalStatusActionTypes.GET_INTERNAL_STATUS: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            error: action.payload.error,
          };
        }

        case InternalStatusActionTypes.ADD_INTERNAL_STATUS: {
          showWarningAlert(action.payload.error);
          return {
            ...state,
            loading: false,
            error: action.payload.error,
          };
        }

        case InternalStatusActionTypes.UPDATE_INTERNAL_STATUS: {
          showWarningAlert(action.payload.error);
          return {
            ...state,
            loading: false,
            error: action.payload.error,
          };
        }

        case InternalStatusActionTypes.DELETE_INTERNAL_STATUS: {
          console.log(action.payload.error);

          showErrorAlert(action.payload.error);
          return {
            ...state,
            loading: false,
            error: action.payload.error,
          };
        }
        default:
          return { ...state };
      }

    case InternalStatusActionTypes.GET_INTERNAL_STATUS: {
      return { ...state, loading: true, initialLoading: true };
    }
    case InternalStatusActionTypes.ADD_INTERNAL_STATUS: {
      return {
        ...state,
        loading: true,
      };
    }
    case InternalStatusActionTypes.UPDATE_INTERNAL_STATUS: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return { ...state };
  }
};

export default InternalStatus;
