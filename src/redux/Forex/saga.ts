import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import { forexApiError, forexApiSuccess } from "./actions";
import { ForexTypes } from "./constants";
import {
  getForexCommisionsApi,
  getForexDataApi,
} from "../../helpers/api/forex";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getUserFromCookie } from "../../helpers/api/apiCore";

function* getForexData(): SagaIterator {
  try {
    let response = yield call(getForexDataApi);

    const data = response.data.data;
    yield put(forexApiSuccess(ForexTypes.GET_FOREX_DATA, data));
  } catch (error: any) {
    yield put(forexApiError(ForexTypes.GET_FOREX_DATA, error));
  }
}
function* getForexCommisions(): SagaIterator {
  try {
    // let response;
    // const user = getUserFromCookie();

    // // if (user.role_name == "CRED_ADMIN") {
    // //   response = yield call(getForexDataCredAdminApi);
    // // } else {
    // //   response = yield call(getForexDataApi);
    // // }

    const response = yield call(getForexCommisionsApi);
    const data = response.data.data;
    yield put(forexApiSuccess(ForexTypes.GET_COMMISIONS, data));
  } catch (error: any) {
    yield put(forexApiError(ForexTypes.GET_COMMISIONS, error));
  }
}

export function* watchGetForexData() {
  yield takeEvery(ForexTypes.GET_FOREX_DATA, getForexData);
}
export function* watchGetForexCommisions() {
  yield takeEvery(ForexTypes.GET_COMMISIONS, getForexCommisions);
}

function* forexSaga() {
  yield all([fork(watchGetForexData), fork(watchGetForexCommisions)]);
}

export default forexSaga;
