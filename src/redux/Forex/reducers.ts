import { showWarningAlert } from "../../constants/alerts";
import { ForexTypes } from "./constants";

const INIT_STATE = {
  forexData: [],
  commisions: [],
  loading: false,
  initialLoading: true,
  error: null,
};

const Forex = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ForexTypes.API_SUCCESS: {
      switch (action.payload.actionType) {
        case ForexTypes.GET_FOREX_DATA:
          return {
            ...state,
            forexData: action.payload.data,
            loading: false,
            initialLoading: false,
            error: null,
          };
        case ForexTypes.GET_COMMISIONS:
          return {
            ...state,
            commisions: action.payload.data,
            loading: false,
            initialLoading: false,
            error: null,
          };
        default:
          return { ...state };
      }
    }

    case ForexTypes.API_ERROR: {
      switch (action.payload.actionType) {
        case ForexTypes.GET_FOREX_DATA:
          showWarningAlert(action.payload.error);
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
          };
        case ForexTypes.GET_COMMISIONS:
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
          };
        default:
          return { ...state };
      }
    }
    case ForexTypes.GET_FOREX_DATA:
      return {
        ...state,
        loading: true,
        initialLoading: true,
        error: null,
      };
    case ForexTypes.GET_COMMISIONS:
      return {
        ...state,
        loading: true,
        initialLoading: true,
        error: null,
      };
    default:
      return { ...state };
  }
};

export default Forex;
