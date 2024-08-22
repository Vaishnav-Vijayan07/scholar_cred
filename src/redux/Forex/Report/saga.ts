import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import { ForexReportTypes } from "./constants";
import { forexReportApiError, forexReportApiSuccess } from "./actions";
import { getConsultantsApi, getReportsApi } from "../../../helpers/api/forex";

function* getReportsData({
  payload: { year, month, consultants },
}: any): SagaIterator {
  try {
    const response = yield call(getReportsApi, year, month, consultants);
    const data = response.data.data;
    yield put(forexReportApiSuccess(ForexReportTypes.GET_REPORT_DATA, data));
  } catch (error: any) {
    yield put(forexReportApiError(ForexReportTypes.GET_REPORT_DATA, error));
  }
}

function* getConsultantsData(): SagaIterator {
  try {
    const response = yield call(getConsultantsApi);
    const data = response.data.data;
    yield put(forexReportApiSuccess(ForexReportTypes.GET_CONSULTANT, data));
  } catch (error: any) {
    yield put(forexReportApiError(ForexReportTypes.GET_CONSULTANT, error));
  }
}

export function* watchGetSettlementsData() {
  yield takeEvery(ForexReportTypes.GET_REPORT_DATA, getReportsData);
}

export function* watchGetConsultantsData() {
  yield takeEvery(ForexReportTypes.GET_CONSULTANT, getConsultantsData);
}

function* forexReportSaga() {
  yield all([fork(watchGetSettlementsData), fork(watchGetConsultantsData)]);
}

export default forexReportSaga;
