// constants
import { CommentActionTypes } from "./constants";

export interface CommentActionType {
  type:
    | CommentActionTypes.API_RESPONSE_SUCCESS
    | CommentActionTypes.API_RESPONSE_ERROR
    | CommentActionTypes.API_RESPONSE_SUCCESS
    | CommentActionTypes.DELETE_COMMENTS
    | CommentActionTypes.EDIT_COMMENTS
    | CommentActionTypes.CREATE_COMMENTS
    | CommentActionTypes.GET_COMMENTS;
  payload: {} | string;
}
interface CommentData {
  student_id: number;
  comment: string;
}

// Common success
export const commentApiResponseSuccess = (actionType: string, data: CommentData | {}): CommentActionType => ({
  type: CommentActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

// Common error
export const commentApiResponseError = (actionType: string, error: string): CommentActionType => ({
  type: CommentActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

//create consultant;

export const createComment = (student_id: number, comment: string): CommentActionType => ({
  type: CommentActionTypes.CREATE_COMMENTS,
  payload: {
    student_id,
    comment,
  },
});

//edit consultant

export const editComment = (id: number, student_id: number, comment: string): CommentActionType => ({
  type: CommentActionTypes.EDIT_COMMENTS,
  payload: {
    id,
    student_id,
    comment,
  },
});

//delete consultant

export const deleteComment = (id: number, student_id: number,) => ({
  type: CommentActionTypes.DELETE_COMMENTS,
  payload: { id, student_id },
});

export const getComment = (student_id: number): CommentActionType => ({
  type: CommentActionTypes.GET_COMMENTS,
  payload: { student_id },
});
