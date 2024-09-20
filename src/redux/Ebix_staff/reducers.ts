// constants
import { showSuccessAlert } from "../../constants/alerts";
import { EbixStaffActionTypes } from "./constants";

const INIT_STATE = {
  ebixStaff: [],
  ebixDocs: [],
  payDetails: [],
  swiftCopies: [],
  loading: false,
  initialLoading: true,
  error: null,
};

interface EbixUserData {
  id: number;
  username: string;
  email: string;
  user_type_id: number;
  created_by: number;
}

interface AuthActionType {
  type:
    | EbixStaffActionTypes.API_RESPONSE_SUCCESS
    | EbixStaffActionTypes.API_RESPONSE_ERROR
    | EbixStaffActionTypes.CREATE_EBIX_STAFF
    | EbixStaffActionTypes.GET_EBIX_STAFF
    | EbixStaffActionTypes.GET_DOCS
    | EbixStaffActionTypes.UPLOAD_SWIFT
    | EbixStaffActionTypes.GET_SWIFT
    | EbixStaffActionTypes.GET_DETAILS
    | EbixStaffActionTypes.UPDATE_BOOKING_STATUS
    | EbixStaffActionTypes.DELETE_EBIX_STAFF;
  payload: {
    actionType?: string;
    data?: EbixUserData | {};
    error?: string;
    ebixStaff?: [];
  };
}

interface State {
  user?: EbixUserData | {};
  loading?: boolean;
  value?: boolean;
}

const EbixStaffReducer = (
  state: State = INIT_STATE,
  action: AuthActionType
): any => {
  switch (action.type) {
    case EbixStaffActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case EbixStaffActionTypes.CREATE_EBIX_STAFF: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }
        case EbixStaffActionTypes.GET_EBIX_STAFF: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            ebixStaff: action.payload.data,
            error: null,
          };
        }
        case EbixStaffActionTypes.GET_DOCS: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            ebixDocs: action.payload.data,
            error: null,
          };
        }

        case EbixStaffActionTypes.GET_DETAILS: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            payDetails: action.payload.data,
            error: null,
          };
        }

        case EbixStaffActionTypes.GET_SWIFT: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            swiftCopies: action.payload.data,
            error: null,
          };
        }

        case EbixStaffActionTypes.UPLOAD_SWIFT: {
          return {
            ...state,
            loading: false,
            error: null,
          };
        }

        case EbixStaffActionTypes.UPDATE_BOOKING_STATUS: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }

        case EbixStaffActionTypes.DELETE_EBIX_STAFF: {
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

    case EbixStaffActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case EbixStaffActionTypes.CREATE_EBIX_STAFF: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }

        case EbixStaffActionTypes.GET_EBIX_STAFF: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
          };
        }

        case EbixStaffActionTypes.GET_DOCS: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
          };
        }

        case EbixStaffActionTypes.GET_SWIFT: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
          };
        }

        case EbixStaffActionTypes.GET_DETAILS: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
          };
        }

        case EbixStaffActionTypes.UPLOAD_SWIFT: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
          };
        }

        case EbixStaffActionTypes.UPDATE_BOOKING_STATUS: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }

        case EbixStaffActionTypes.DELETE_EBIX_STAFF: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }
        default:
          return { ...state };
      }

    case EbixStaffActionTypes.CREATE_EBIX_STAFF:
      return { ...state, loading: true };
    case EbixStaffActionTypes.GET_EBIX_STAFF:
      return { ...state, loading: true, initialLoading: true };
    case EbixStaffActionTypes.GET_DOCS:
      return { ...state, loading: true, initialLoading: true };
    case EbixStaffActionTypes.GET_DETAILS:
      return { ...state, loading: true, initialLoading: true };
    case EbixStaffActionTypes.GET_SWIFT:
      return { ...state, loading: true, initialLoading: true };
    case EbixStaffActionTypes.UPLOAD_SWIFT:
      return { ...state, loading: true };
    case EbixStaffActionTypes.UPDATE_BOOKING_STATUS:
      return { ...state, loading: true };
    case EbixStaffActionTypes.DELETE_EBIX_STAFF:
      return { ...state, loading: true };
    default:
      return { ...state };
  }
};

export default EbixStaffReducer;
