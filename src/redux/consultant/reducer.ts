// apicore
import { showSuccessAlert } from "../../constants/alerts";
import { APICore } from "../../helpers/api/apiCore";

// constants
import { ConsultantActionTypes } from "./constants";

const INIT_STATE = {
  consultant: [],
  consultantById: {},
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

interface ConsultantActionType {
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

const ConsultantReducer = (state: State = INIT_STATE, action: ConsultantActionType): any => {
  switch (action.type) {
    case ConsultantActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case ConsultantActionTypes.CREATE_CONSULTANT: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }

        case ConsultantActionTypes.EDIT_CONSULTANT: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }
        case ConsultantActionTypes.GET_CONSULTANT_BY_ID: {
          return {
            ...state,
            loading: false,
            consultantById: action.payload.data,
          };
        }
        case ConsultantActionTypes.GET_CONSULTANT: {
          return {
            ...state,
            loading: false,
            consultant: action.payload.data,
          };
        }
        case ConsultantActionTypes.DELETE_CONSULTANT: {
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

    case ConsultantActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case ConsultantActionTypes.CREATE_CONSULTANT: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }

        case ConsultantActionTypes.EDIT_CONSULTANT: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }

        case ConsultantActionTypes.GET_CONSULTANT: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }

        case ConsultantActionTypes.GET_CONSULTANT_BY_ID: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }

        default:
          return { ...state };
      }

    case ConsultantActionTypes.CREATE_CONSULTANT:
      return { ...state, loading: true };

    case ConsultantActionTypes.EDIT_CONSULTANT:
      return { ...state, loading: true };

    case ConsultantActionTypes.GET_CONSULTANT:
      return { ...state, loading: true };

    case ConsultantActionTypes.GET_CONSULTANT_BY_ID:
      return { ...state, loading: true };

    case ConsultantActionTypes.DELETE_CONSULTANT:
      return { ...state, loading: true };

    default:
      return { ...state };
  }
};
export default ConsultantReducer;
