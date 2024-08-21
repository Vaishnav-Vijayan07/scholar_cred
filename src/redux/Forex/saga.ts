import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import { forexApiError, forexApiSuccess } from "./actions";
import { ForexTypes } from "./constants";
import {
  getForexCommisionsApi,
  getForexDataApi,
  getSettlementsApi,
} from "../../helpers/api/forex";

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
    const response = yield call(getForexCommisionsApi);
    const data = response.data.data;
    yield put(forexApiSuccess(ForexTypes.GET_COMMISIONS, data));
  } catch (error: any) {
    yield put(forexApiError(ForexTypes.GET_COMMISIONS, error));
  }
}

function* getSettlementsData({ payload: { year,month } }: any): SagaIterator {
  try {
    const response = yield call(getSettlementsApi, year,month);
    const data = response.data.data;
    yield put(forexApiSuccess(ForexTypes.GET_SETTLEMENTS, data));
  } catch (error: any) {
    yield put(forexApiError(ForexTypes.GET_SETTLEMENTS, error));
  }
}

export function* watchGetForexData() {
  yield takeEvery(ForexTypes.GET_FOREX_DATA, getForexData);
}

export function* watchGetForexCommisions() {
  yield takeEvery(ForexTypes.GET_COMMISIONS, getForexCommisions);
}

export function* watchGetSettlementsData() {
  yield takeEvery(ForexTypes.GET_SETTLEMENTS, getSettlementsData);
}

function* forexSaga() {
  yield all([
    fork(watchGetForexData),
    fork(watchGetForexCommisions),
    fork(watchGetSettlementsData),
  ]);
}

export default forexSaga;
