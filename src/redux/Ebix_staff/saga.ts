import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// actions
import {
  ebixStaffResponseSuccess,
  ebixStaffResponseError,
  getEbixUsers,
} from "./actions";

// constants
import { EbixStaffActionTypes } from "./constants";
import {
  createEbixUsersApi,
  deleteEbixUsersApi,
  getCredEbixUsersApi,
  getEbixDocsApi,
} from "../../helpers/api/ebix_staff";

interface EbixUserData {
  payload: {
    id: number;
    username: string;
    email: string;
    user_type_id: number;
    created_by: number;
  };
  type: string;
}

function* createEbixStaff({
  payload: { username, email, user_type_id, created_by },
  type,
}: EbixUserData): SagaIterator {
  try {
    const response = yield call(createEbixUsersApi, {
      username,
      email,
      user_type_id,
      created_by,
    });
    const EbixUserData = response.data.message;
    // NOTE - You can change this according to response format from your api

    yield put(
      ebixStaffResponseSuccess(
        EbixStaffActionTypes.CREATE_EBIX_STAFF,
        EbixUserData
      )
    );
    yield put(getEbixUsers());
  } catch (error: any) {
    yield put(
      ebixStaffResponseError(EbixStaffActionTypes.CREATE_EBIX_STAFF, error)
    );
  }
}

function* getEbixStaff(): SagaIterator {
  try {
    const response = yield call(getCredEbixUsersApi);
    const EbixUserData = response.data.data;

    yield put(
      ebixStaffResponseSuccess(
        EbixStaffActionTypes.GET_EBIX_STAFF,
        EbixUserData
      )
    );
  } catch (error: any) {
    yield put(
      ebixStaffResponseError(EbixStaffActionTypes.GET_EBIX_STAFF, error)
    );
  }
}
function* getEbixStaffDocs(): SagaIterator {
  try {
    const response = yield call(getEbixDocsApi);
    const EbixDocs = response.data.data;

    yield put(
      ebixStaffResponseSuccess(EbixStaffActionTypes.GET_DOCS, EbixDocs)
    );
  } catch (error: any) {
    yield put(ebixStaffResponseError(EbixStaffActionTypes.GET_DOCS, error));
  }
}

function* deleteEbixStaff({ payload: { id } }: EbixUserData): SagaIterator {
  try {
    const response = yield call(deleteEbixUsersApi, id);
    const EbixUserData = response.data.message;
    // NOTE - You can change this according to response format from your api

    yield put(
      ebixStaffResponseSuccess(
        EbixStaffActionTypes.DELETE_EBIX_STAFF,
        EbixUserData
      )
    );
    yield put(getEbixUsers());
  } catch (error: any) {
    yield put(
      ebixStaffResponseError(EbixStaffActionTypes.DELETE_EBIX_STAFF, error)
    );
  }
}

export function* watchCreateEbixUser() {
  yield takeEvery(EbixStaffActionTypes.CREATE_EBIX_STAFF, createEbixStaff);
}

export function* watchGetEbixUser() {
  yield takeEvery(EbixStaffActionTypes.GET_EBIX_STAFF, getEbixStaff);
}

export function* watchGetEbixUserDocs() {
  yield takeEvery(EbixStaffActionTypes.GET_DOCS, getEbixStaffDocs);
}

export function* watchDeleteEbixUser() {
  yield takeEvery(EbixStaffActionTypes.DELETE_EBIX_STAFF, deleteEbixStaff);
}

function* ebixStaffSaga() {
  yield all([
    fork(watchCreateEbixUser),
    fork(watchDeleteEbixUser),
    fork(watchGetEbixUser),
    fork(watchGetEbixUserDocs),
  ]);
}

export default ebixStaffSaga;
