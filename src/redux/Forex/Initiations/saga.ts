import { AuthActionType } from "./../../authentication/actions";
import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import { ForexInitiationTypes } from "./constants";
import { forexInitApiError, forexInitApiSuccess, getInitData } from "./actions";
import { addForexInitApi, getForexInitDataApi, updateForexInitDataApi } from "../../../helpers/api/forex";

function* getForexInitData(): SagaIterator {
  try {
    let response = yield call(getForexInitDataApi);

    const data = response.data.data;
    yield put(forexInitApiSuccess(ForexInitiationTypes.GET_INIT_DATA, data));
  } catch (error: any) {
    yield put(forexInitApiError(ForexInitiationTypes.GET_INIT_DATA, error));
  }
}

function* addForexInitData({ payload: { student_id, navigate } }: any): SagaIterator {
  try {
    const response = yield call(addForexInitApi, student_id);
    const data = response.data.data;
    yield put(forexInitApiSuccess(ForexInitiationTypes.ADD_INIT_DATA, data));
    navigate("/forex/initiations");
  } catch (error: any) {
    yield put(forexInitApiError(ForexInitiationTypes.ADD_INIT_DATA, error));
  }
}
function* updateInitStatusData({ payload: { status, student_id } }: any): SagaIterator {
  try {
    const response = yield call(updateForexInitDataApi, status, student_id);
    const data = response.data.data;
    yield put(forexInitApiSuccess(ForexInitiationTypes.UPDATE_INIT_STATUS, data));
    // trigger the get action
    yield put(getInitData());
  } catch (error: any) {
    yield put(forexInitApiError(ForexInitiationTypes.UPDATE_INIT_STATUS, error));
  }
}

export function* watchGetForexInitData() {
  yield takeEvery(ForexInitiationTypes.GET_INIT_DATA, getForexInitData);
}

export function* watchUpdateInitStatus() {
  yield takeEvery(ForexInitiationTypes.UPDATE_INIT_STATUS, updateInitStatusData);
}
export function* watchAddInitData() {
  yield takeEvery(ForexInitiationTypes.ADD_INIT_DATA, addForexInitData);
}

function* forexInitSaga() {
  yield all([fork(watchGetForexInitData), fork(watchUpdateInitStatus), fork(watchAddInitData)]);
}

export default forexInitSaga;
