import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// apicore
import { APICore, setAuthorization } from "../../helpers/api/apiCore";

// helpers
import {
  login as loginApi,
  logout as logoutApi,
  signup as signupApi,
  forgotPassword as forgotPasswordApi,
  changePassword as changePasswordApi,
} from "../../helpers/";

// actions
import { authApiResponseSuccess, authApiResponseError } from "./actions";

// constants
import { AuthActionTypes } from "./constants";
import { editProfileApi} from "../../helpers/api/auth";
import { refreshData } from "../../reducer/refreshReducer";

interface UserData {
  payload: {
    username: string;
    password: string;
    fullname: string;
    email: string;
    old_passowrd: string;
    new_password: string;
    user_id: string;
  };
  type: string;
}

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({
  payload: { username, password },
  type,
}: UserData): SagaIterator {
  try {
    const response = yield call(loginApi, { username, password });
    const user = response?.data;
    // NOTE - You can change this according to response format from your api
    api.setLoggedInUser(user);
    setAuthorization(user["token"]);
    yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
    api.setLoggedInUser(null);
    setAuthorization(null);
  }
}

/**
 * Logout the user
 */
function* logout(): SagaIterator {
  try {
    // yield call(logoutApi);
    api.setLoggedInUser(null);
    setAuthorization(null);
    yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
  }
}

function* signup({
  payload: { fullname, email, password },
}: UserData): SagaIterator {
  try {
    const response = yield call(signupApi, { fullname, email, password });
    const user = response.data;
    // api.setLoggedInUser(user);
    // setAuthorization(user['token']);
    yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
    api.setLoggedInUser(null);
    setAuthorization(null);
  }
}

function* forgotPassword({ payload: { username } }: UserData): SagaIterator {
  try {
    const response = yield call(forgotPasswordApi, { username });
    yield put(
      authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data)
    );
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
  }
}

function* changePassword({
  payload: { old_passowrd, new_password, user_id },
}: UserData): SagaIterator {
  try {
    const response = yield call(changePasswordApi, {
      old_passowrd,
      new_password,
      user_id,
    });

    yield put(
      authApiResponseSuccess(
        AuthActionTypes.CHANGE_PASSWORD,
        response.data.message
      )
    );
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.CHANGE_PASSWORD, error));
  }
}

function* editProfile({ payload: { data } }: any): SagaIterator {
  try {
    const response = yield call(editProfileApi, data);
    const message = response.data;
    yield put(authApiResponseSuccess(AuthActionTypes.EDIT_PROFILE, message));
    yield put(refreshData())
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.EDIT_PROFILE, error));
  }
}

export function* watchLoginUser() {
  yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchLogout() {
  yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup(): any {
  yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchForgotPassword(): any {
  yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

export function* watchChangePassword(): any {
  yield takeEvery(AuthActionTypes.CHANGE_PASSWORD, changePassword);
}

export function* watchEditProfile(): any {
  yield takeEvery(AuthActionTypes.EDIT_PROFILE, editProfile);
}


function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchForgotPassword),
    fork(watchChangePassword),
    fork(watchEditProfile),
  ]);
}

export default authSaga;
