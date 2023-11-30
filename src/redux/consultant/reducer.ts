// apicore
import { APICore } from "../../helpers/api/apiCore";

// constants
import { ConsultantActionTypes } from "./constants";

const api = new APICore();

const INIT_STATE = {
  consultant: [],
  loading: false,
};

interface ConsultantData {
  company_name: string;
  business_address: string;
  email: string;
  phone: string;
  image_url: string;
  alternative_phone: string;
  gst: string;
  location: string;
  pin_code: string;
  pan_no: string;
  created_by: number;
}

interface AuthActionType {
  type:
    | ConsultantActionTypes.API_RESPONSE_SUCCESS
    | ConsultantActionTypes.API_RESPONSE_ERROR
    | ConsultantActionTypes.CREATE_CONSULTANT
    | ConsultantActionTypes.EDIT_CONSULTANT
    | ConsultantActionTypes.DELETE_CONSULTANT
    | ConsultantActionTypes.GET_CONSULTANT
    | ConsultantActionTypes.GET_CONSULTANT_BY_ID;
  payload: {
    actionType?: string;
    data?: ConsultantData | {};
    error?: string;
  };
}

interface State {
  consultant?: ConsultantData | {};
  loading?: boolean;
  value?: boolean;
}

const ConsultantReducer = (
  state: State = INIT_STATE,
  action: AuthActionType
): any => {
  switch (action.type) {
    case ConsultantActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case ConsultantActionTypes.CREATE_CONSULTANT: {
          return {
            ...state,
            user: action.payload.data,
            userLoggedIn: true,
            loading: false,
          };
        }

        case ConsultantActionTypes.EDIT_CONSULTANT: {
          return {
            ...state,
            user: null,
            loading: false,
            userLogout: true,
          };
        }
        case ConsultantActionTypes.GET_CONSULTANT_BY_ID: {
          return {
            ...state,
            user: null,
            loading: false,
            userLogout: true,
          };
        }
        case ConsultantActionTypes.DELETE_CONSULTANT: {
          return {
            ...state,
            user: null,
            loading: false,
            userLogout: true,
          };
        }
        case ConsultantActionTypes.GET_CONSULTANT: {
          return {
            ...state,
            user: null,
            loading: false,
            userLogout: true,
          };
        }

        default:
          return { ...state };
      }

    case ConsultantActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case ConsultantActionTypes.CREATE_CONSULTANT: {
          return {
            ...state,
            error: action.payload.error,
            userLoggedIn: false,
            loading: false,
          };
        }

        case ConsultantActionTypes.EDIT_CONSULTANT: {
          return {
            ...state,
            error: action.payload.error,
            userLoggedIn: false,
            loading: false,
          };
        }

        case ConsultantActionTypes.GET_CONSULTANT: {
          return {
            ...state,
            error: action.payload.error,
            userLoggedIn: false,
            loading: false,
          };
        }

        case ConsultantActionTypes.GET_CONSULTANT_BY_ID: {
          return {
            ...state,
            error: action.payload.error,
            userLoggedIn: false,
            loading: false,
          };
        }

        default:
          return { ...state };
      }

    case ConsultantActionTypes.CREATE_CONSULTANT:
      return { ...state, loading: true, userLoggedIn: false };

    case ConsultantActionTypes.EDIT_CONSULTANT:
      return { ...state, loading: true, userLoggedIn: false };

    case ConsultantActionTypes.GET_CONSULTANT:
      return { ...state, loading: true, userLoggedIn: false };

    case ConsultantActionTypes.GET_CONSULTANT_BY_ID:
      return { ...state, loading: true, userLoggedIn: false };

    case ConsultantActionTypes.DELETE_CONSULTANT:
      return { ...state, loading: true, userLoggedIn: false };

    default:
      return { ...state };
  }
};
export default ConsultantReducer;
