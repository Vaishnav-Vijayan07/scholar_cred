import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// apicore
import { APICore, setAuthorization } from "../../helpers/api/apiCore";

// helpers
import { getUserTypes as getUserTypesApi } from "../../helpers/";

// actions
import { authApiResponseSuccess, authApiResponseError } from "./actions";

// constants
import { GetUserTypes } from "./constants";

interface UserData {
  payload: {
    username: string;
    password: string;
    fullname: string;
    email: string;
  };
  type: string;
}

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* getUserTypes({
  payload: { username, password },
  type,
}: UserData): SagaIterator {
  try {
    const response = yield call(getUserTypesApi, {});
    const user_types = response.data;
    // NOTE - You can change this according to response format from your api

    yield put(authApiResponseSuccess(GetUserTypes.GET_USER_TYPES, user_types));
  } catch (error: any) {
    yield put(authApiResponseError(GetUserTypes.GET_USER_TYPES, error));
  }
}

/**
 * Logout the user
 */

export function* watchGetUserTypes() {
  yield takeEvery(GetUserTypes.GET_USER_TYPES, getUserTypes);
}

function* getUserTypesSaga() {
  yield all([fork(watchGetUserTypes)]);
}

export default getUserTypesSaga;
