import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// helpers
import {
  createAdminUsers as createAdminUsersApi,
  editAdminUsers as editAdminUsersApi,
  getCredAdminUsers as getAdminUsersApi,
  getAdminUsersById as getAdminUsersByIdApi,
  deleteAdminUsers as deleteAdminUsersApi,
  resetPassword as resetPasswordApi,
} from "../../helpers/";

// actions
import { credAuthApiResponseSuccess, credAuthApiResponseError, getCredAdminUsers } from "./actions";

// constants
import { AdminActionTypes } from "./constants";

interface AdminUserData {
  payload: {
    id: number;
    username: string;
    email: string;
    full_name: string;
    user_type_id: number;
    created_by: number;
    consultant_id: number;
  };
  type: string;
}

function* createAdminUsers({ payload: { username, email, full_name, user_type_id, created_by }, type }: AdminUserData): SagaIterator {
  try {
    const response = yield call(createAdminUsersApi, {
      username,
      email,
      full_name,
      user_type_id,
      created_by,
    });
    const adminUserData = response.data.message;
    // NOTE - You can change this according to response format from your api

    yield put(credAuthApiResponseSuccess(AdminActionTypes.CREATE_CRED_ADMIN_USER, adminUserData));
    yield put(getCredAdminUsers());
  } catch (error: any) {
    yield put(credAuthApiResponseError(AdminActionTypes.CREATE_CRED_ADMIN_USER, error));
  }
}

function* editAdminUsers({ payload: { id, username, email, full_name, user_type_id, created_by } }: AdminUserData): SagaIterator {
  try {
    const response = yield call(editAdminUsersApi, id, {
      username,
      email,
      full_name,
      user_type_id,
      created_by,
    });
    const adminUserData = response.data.message;
    // NOTE - You can change this according to response format from your api

    yield put(credAuthApiResponseSuccess(AdminActionTypes.EDIT_CRED_ADMIN_USER, adminUserData));
    yield put(getCredAdminUsers());
  } catch (error: any) {
    yield put(credAuthApiResponseError(AdminActionTypes.EDIT_CRED_ADMIN_USER, error));
  }
}

function* getAdminUsers(): SagaIterator {
  try {
    const response = yield call(getAdminUsersApi);
    const adminUserData = response.data.data;

    yield put(credAuthApiResponseSuccess(AdminActionTypes.GET_CRED_ADMIN_USERS, adminUserData));
  } catch (error: any) {
    yield put(credAuthApiResponseError(AdminActionTypes.GET_CRED_ADMIN_USERS, error));
  }
}

function* getAdminUsersById({ payload: { id } }: AdminUserData): SagaIterator {
  try {
    const response = yield call(getAdminUsersByIdApi, id);
    const adminUserData = response.data.data;
    // NOTE - You can change this according to response format from your api

    yield put(credAuthApiResponseSuccess(AdminActionTypes.GET_CRED_ADMIN_USERS_BY_ID, adminUserData));
  } catch (error: any) {
    yield put(credAuthApiResponseError(AdminActionTypes.GET_CRED_ADMIN_USERS_BY_ID, error));
  }
}

function* deleteAdminUsers({ payload: { id } }: AdminUserData): SagaIterator {
  try {
    const response = yield call(deleteAdminUsersApi, id);
    const adminUserData = response.data.message;
    // NOTE - You can change this according to response format from your api

    yield put(credAuthApiResponseSuccess(AdminActionTypes.DELETE_CRED_ADMIN_USERS, adminUserData));
    yield put(getCredAdminUsers());
  } catch (error: any) {
    yield put(credAuthApiResponseError(AdminActionTypes.DELETE_CRED_ADMIN_USERS, error));
  }
}

function* resetPassword({ payload: { username } }: AdminUserData): SagaIterator {
  try {
    const response = yield call(resetPasswordApi, username);
    const adminUserData = response.data.message;
    // NOTE - You can change this according to response format from your api

    yield put(credAuthApiResponseSuccess(AdminActionTypes.RESET_ADMIN_PASSWORD, adminUserData));
    // yield put(getCredAdminUsers());
  } catch (error: any) {
    yield put(credAuthApiResponseError(AdminActionTypes.RESET_ADMIN_PASSWORD, error));
  }
}

export function* watchCreateAdminUser() {
  yield takeEvery(AdminActionTypes.CREATE_CRED_ADMIN_USER, createAdminUsers);
}
export function* watchEditAdminUser() {
  yield takeEvery(AdminActionTypes.EDIT_CRED_ADMIN_USER, editAdminUsers);
}
export function* watchGetAdminUser() {
  yield takeEvery(AdminActionTypes.GET_CRED_ADMIN_USERS, getAdminUsers);
}
export function* watchGetAdminUserbyId() {
  yield takeEvery(AdminActionTypes.GET_CRED_ADMIN_USERS_BY_ID, getAdminUsersById);
}

export function* watchDeleteAdminUser() {
  yield takeEvery(AdminActionTypes.DELETE_CRED_ADMIN_USERS, deleteAdminUsers);
}

export function* watchResetPassword() {
  yield takeEvery(AdminActionTypes.RESET_ADMIN_PASSWORD, resetPassword);
}

function* consultantStaffSaga() {
  yield all([fork(watchCreateAdminUser), fork(watchEditAdminUser), fork(watchDeleteAdminUser), fork(watchGetAdminUser), fork(watchGetAdminUserbyId), fork(watchResetPassword)]);
}

export default consultantStaffSaga;
