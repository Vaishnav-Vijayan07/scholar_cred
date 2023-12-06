import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// apicore
import { APICore, setAuthorization } from "../../helpers/api/apiCore";

// helpers
import {
  createAdminUsers as createAdminUsersApi,
  editAdminUsers as editAdminUsersApi,
  getCredAdminUsers as getAdminUsersApi,
  getAdminUsersById as getAdminUsersByIdApi,
  deleteAdminUsers as deleteAdminUsersApi,
} from "../../helpers/";

// actions
import { credAuthApiResponseSuccess, credAuthApiResponseError } from "./actions";

// constants
import { AdminActionTypes } from "./constants";
import { get } from "sortablejs";

interface AdminUserData {
  payload: {
    id: number;
    username: string;
    password_hash: string;
    email: string;
    full_name: string;
    user_type_id: number;
    created_by: number;
    consultant_id: number;
  };
  type: string;
}

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* createAdminUsers({
  payload: {
    username,
    password_hash,
    email,
    full_name,
    user_type_id,
    created_by,
    consultant_id,
  },
  type,
}: AdminUserData): SagaIterator {
  try {
    const response = yield call(createAdminUsersApi, {
      username,
      password_hash,
      email,
      full_name,
      user_type_id,
      created_by,
      consultant_id,
    });
    const adminUserData = response.data;
    // NOTE - You can change this according to response format from your api

    yield put(
      credAuthApiResponseSuccess(AdminActionTypes.CREATE_CRED_ADMIN_USER, adminUserData)
    );
  } catch (error: any) {
    yield put(credAuthApiResponseError(AdminActionTypes.CREATE_CRED_ADMIN_USER, error));
  }
}

function* editAdminUsers({
  payload: { id, full_name },
  type,
}: AdminUserData): SagaIterator {
  try {
    const response = yield call(editAdminUsersApi, id, {
      full_name,
    });
    const adminUserData = response.data;
    // NOTE - You can change this according to response format from your api

    yield put(
      credAuthApiResponseSuccess(AdminActionTypes.EDIT_CRED_ADMIN_USER, adminUserData)
    );
  } catch (error: any) {
    yield put(credAuthApiResponseError(AdminActionTypes.EDIT_CRED_ADMIN_USER, error));
  }
}

function* getAdminUsers({
  payload: { id },
  type,
}: AdminUserData): SagaIterator {
  try {
    const response = yield call(getAdminUsersApi);
    const adminUserData = response.data;
    yield put(
      credAuthApiResponseSuccess(AdminActionTypes.GET_CRED_ADMIN_USERS, adminUserData)
    );
  } catch (error: any) {
    yield put(credAuthApiResponseError(AdminActionTypes.GET_CRED_ADMIN_USERS, error));
  }
}

function* getAdminUsersById({
  payload: { id },
  type,
}: AdminUserData): SagaIterator {
  try {
    const response = yield call(getAdminUsersByIdApi, id, {});
    const adminUserData = response.data;
    // NOTE - You can change this according to response format from your api

    yield put(
      credAuthApiResponseSuccess(AdminActionTypes.GET_CRED_ADMIN_USERS_BY_ID, adminUserData)
    );
  } catch (error: any) {
    yield put(credAuthApiResponseError(AdminActionTypes.GET_CRED_ADMIN_USERS_BY_ID, error));
  }
}

function* deleteAdminUsers({
  payload: { id },
  type,
}: AdminUserData): SagaIterator {
  try {
    const response = yield call(deleteAdminUsersApi, id, {});
    const adminUserData = response.data;
    // NOTE - You can change this according to response format from your api

    yield put(
      credAuthApiResponseSuccess(AdminActionTypes.DELETE_CRED_ADMIN_USERS, adminUserData)
    );
  } catch (error: any) {
    yield put(credAuthApiResponseError(AdminActionTypes.DELETE_CRED_ADMIN_USERS, error));
  }
}

/**
 * Logout the user
 */

export function* createAdminUser() {
  yield takeEvery(AdminActionTypes.CREATE_CRED_ADMIN_USER, createAdminUsers);
}
export function* editAdminUser() {
  yield takeEvery(AdminActionTypes.EDIT_CRED_ADMIN_USER, editAdminUsers);
}
export function* getAdminUser() {
  yield takeEvery(AdminActionTypes.GET_CRED_ADMIN_USERS, getAdminUsers);
}
export function* getAdminUserbyId() {
  yield takeEvery(AdminActionTypes.GET_CRED_ADMIN_USERS_BY_ID, getAdminUsersById);
}

export function* deleteAdminUser() {
  yield takeEvery(AdminActionTypes.DELETE_CRED_ADMIN_USERS, deleteAdminUsers);
}
function* credAdminUsersSaga() {
  yield all([
    fork(createAdminUser),
    fork(editAdminUser),
    fork(deleteAdminUser),
    fork(getAdminUser),
    fork(getAdminUserbyId),
  ]);
}

export default credAdminUsersSaga;
