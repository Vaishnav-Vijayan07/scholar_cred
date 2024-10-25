import { ForexInitiationTypes } from "./constants";

const INIT_STATE = {
  forexInitData : [],
  loading: false,
  initialLoading: true,
  error: null,
};

const ForexInit = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ForexInitiationTypes.API_SUCCESS: {
      switch (action.payload.actionType) {
        case ForexInitiationTypes.GET_INIT_DATA:
          return {
            ...state,
            forexInitData: action.payload.data,
            loading: false,
            initialLoading: false,
            error: null,
          };

        case ForexInitiationTypes.UPDATE_INIT_STATUS:
          return {
            ...state,
            loading: false,
            initialLoading: false,
            error: null,
          };

        default:
          return { ...state };
      }
    }

    case ForexInitiationTypes.API_ERROR: {
      switch (action.payload.actionType) {
        case ForexInitiationTypes.GET_INIT_DATA:
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
          };

        case ForexInitiationTypes.UPDATE_INIT_STATUS:
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
    case ForexInitiationTypes.GET_INIT_DATA:
      return {
        ...state,
        loading: true,
        initialLoading: true,
        error: null,
      };
    case ForexInitiationTypes.UPDATE_INIT_STATUS:
      return {
        ...state,
        loading: true,
        initialLoading: true,
        error: null,
      };
    case ForexInitiationTypes.ADD_INIT_DATA:
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

export default ForexInit;
