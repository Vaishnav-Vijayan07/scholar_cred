import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// apicore
import { APICore } from "../../helpers/api/apiCore";

// helpers
import { createComment as createCommentApi, updateComment as updateCommentApi, getComments as getCommentsApi, deleteComment as deleteCommentApi } from "../../helpers/";

// actions
import { commentApiResponseSuccess, commentApiResponseError, getComment } from "./actions";

// constants
import { CommentActionTypes } from "./constants";

interface ConsultantData {
  payload: {
    id: number;
    student_id: number;
    comment: string;
  };
  type: string;
}

const api = new APICore();

function* createComment({ payload: { student_id, comment }, type }: ConsultantData): SagaIterator {
  try {
    const response = yield call(createCommentApi, {
      student_id,
      comment,
    });

    const consultant_data = response.data.message;

    yield put(commentApiResponseSuccess(CommentActionTypes.CREATE_COMMENTS, consultant_data));
    //calling get method after successfull api creation
    yield put(getComment(student_id));
  } catch (error: any) {
    yield put(commentApiResponseError(CommentActionTypes.CREATE_COMMENTS, error));
  }
}

function* getComments({ payload: { student_id } }: ConsultantData): SagaIterator {
  try {
    const response = yield call(getCommentsApi, student_id);
    const data = response.data.data;

    // NOTE - You can change this according to response format from your api
    yield put(commentApiResponseSuccess(CommentActionTypes.GET_COMMENTS, { data }));
  } catch (error: any) {
    yield put(commentApiResponseError(CommentActionTypes.GET_COMMENTS, error));
    throw error;
  }
}

function* updateComment({ payload: { id, student_id, comment }, type }: ConsultantData): SagaIterator {
  try {
    const response = yield call(updateCommentApi, id, {
      student_id,
      comment,
    });
    const consultant_data = response.data.message;

    yield put(commentApiResponseSuccess(CommentActionTypes.EDIT_COMMENTS, consultant_data));
    yield put(getComment(student_id));
  } catch (error: any) {
    yield put(commentApiResponseError(CommentActionTypes.EDIT_COMMENTS, error));
  }
}

function* deleteComment({ payload: { id, student_id } }: ConsultantData): SagaIterator {
  try {
    const response = yield call(deleteCommentApi, id);
    const data = response.data.message;

    yield put(commentApiResponseSuccess(CommentActionTypes.DELETE_COMMENTS, data));
    yield put(getComment(student_id));
  } catch (error: any) {
    yield put(commentApiResponseSuccess(CommentActionTypes.DELETE_COMMENTS, error));
    throw error;
  }
}

export function* watchGetAllComment() {
  yield takeEvery(CommentActionTypes.GET_COMMENTS, getComments);
}

export function* watchCreateComment() {
  yield takeEvery(CommentActionTypes.CREATE_COMMENTS, createComment);
}

export function* watchEditConsultant() {
  yield takeEvery(CommentActionTypes.EDIT_COMMENTS, updateComment);
}

export function* watchDeleteComment() {
  yield takeEvery(CommentActionTypes.DELETE_COMMENTS, deleteComment);
}

function* commentsSaga() {
  yield all([fork(watchEditConsultant), fork(watchCreateComment), fork(watchGetAllComment), fork(watchDeleteComment)]);
}

export default commentsSaga;
