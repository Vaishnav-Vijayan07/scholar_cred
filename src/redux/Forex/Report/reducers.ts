import { showWarningAlert } from "../../../constants/alerts";
import { ForexReportTypes } from "./constants";

const INIT_STATE = {
  reports: [],
  consultants: [],
  loading: false,
  initialLoading: true,
  error: null,
};

const ForexReport = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ForexReportTypes.API_SUCCESS: {
      switch (action.payload.actionType) {
        case ForexReportTypes.GET_REPORT_DATA:
          return {
            ...state,
            reports: action.payload.data,
            loading: false,
            initialLoading: false,
            error: null,
          };

        case ForexReportTypes.GET_CONSULTANT:
          return {
            ...state,
            consultants: action.payload.data,
            loading: false,
            initialLoading: false,
            error: null,
          };

        default:
          return { ...state };
      }
    }

    case ForexReportTypes.API_ERROR: {
      switch (action.payload.actionType) {
        case ForexReportTypes.GET_REPORT_DATA:
          showWarningAlert(action.payload.error);
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
          };

        case ForexReportTypes.GET_CONSULTANT:
          showWarningAlert(action.payload.error);
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
    case ForexReportTypes.GET_REPORT_DATA:
      return {
        ...state,
        loading: true,
        initialLoading: true,
        error: null,
      };

    case ForexReportTypes.GET_CONSULTANT:
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

export default ForexReport;
