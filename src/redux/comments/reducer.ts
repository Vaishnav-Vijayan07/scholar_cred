// apicore
import { showSuccessAlert } from "../../constants/alerts";

// constants
import { CommentActionTypes } from "./constants";

const INIT_STATE = {
  comments: [],
  loading: false,
  initialLoading: false,
};

interface CommentsData {
  student_id: number;
  comment: string;
}

interface CommentsActionType {
  type:
    | CommentActionTypes.API_RESPONSE_SUCCESS
    | CommentActionTypes.API_RESPONSE_ERROR
    | CommentActionTypes.CREATE_COMMENTS
    | CommentActionTypes.EDIT_COMMENTS
    | CommentActionTypes.DELETE_COMMENTS
    | CommentActionTypes.GET_COMMENTS;
  payload: {
    actionType?: string;
    data?: CommentsData | {};
    error?: string;
  };
}

interface State {
  consultant?: CommentsData | {};
  loading?: boolean;
  value?: boolean;
}

const CommentsReducer = (state: State = INIT_STATE, action: CommentsActionType): any => {
  switch (action.type) {
    case CommentActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case CommentActionTypes.CREATE_COMMENTS: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }

        case CommentActionTypes.EDIT_COMMENTS: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }
        case CommentActionTypes.GET_COMMENTS: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            comments: action.payload.data,
          };
        }
        case CommentActionTypes.DELETE_COMMENTS: {
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

    case CommentActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case CommentActionTypes.CREATE_COMMENTS: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }

        case CommentActionTypes.EDIT_COMMENTS: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }

        case CommentActionTypes.GET_COMMENTS: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
          };
        }

        default:
          return { ...state };
      }

    case CommentActionTypes.CREATE_COMMENTS:
      return { ...state, loading: true };

    case CommentActionTypes.EDIT_COMMENTS:
      return { ...state, loading: true };

    case CommentActionTypes.GET_COMMENTS:
      return { ...state, loading: true, initialLoading: true };

    case CommentActionTypes.DELETE_COMMENTS:
      return { ...state, loading: true };

    default:
      return { ...state };
  }
};
export default CommentsReducer;
