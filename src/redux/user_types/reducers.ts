// apicore
import { APICore } from "../../helpers/api/apiCore";

// constants
import { GetUserTypes } from "./constants";

const api = new APICore();

const INIT_STATE = {
  user: api.getLoggedInUser(),
  loading: false,
};

interface GetUserType {
  type:
    | GetUserTypes.API_RESPONSE_SUCCESS
    | GetUserTypes.API_RESPONSE_ERROR
    | GetUserTypes.GET_USER_TYPES;

  payload: {
    actionType?: string;
    data?: {};
    error?: string;
  };
}

interface State {
  user?: {};
  loading?: boolean;
  value?: boolean;
}

const GetTypes = (state: State = INIT_STATE, action: GetUserType): any => {
  switch (action.type) {
    case GetUserTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GetUserTypes.GET_USER_TYPES: {
          return {
            ...state,
            user: action.payload.data,
            userLoggedIn: true,
            loading: false,
          };
        }

        default:
          return { ...state };
      }

    case GetUserTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GetUserTypes.GET_USER_TYPES: {
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

    default:
      return { ...state };
  }
};

export default GetTypes;
