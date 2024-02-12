import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import {
  getInternalStatus as getInternalStatusApi,
  deleteInternalStatus as deleteInternalStatusApi,
  addInternalStatus as addInternalStatusApi,
  updateInternalStatus as updateInternalStatusApi,
} from "../../helpers/api/internal_status";
import {
  InternalStatusApiResponseError,
  InternalStatusApiResponseSuccess,
  getInternalStatus as getInternalStatusAction,
} from "./actions";
import { InternalStatusActionTypes } from "./constants";

function* getInternalStatus(): SagaIterator {
  try {
    const response = yield call(getInternalStatusApi);
    const data = response.data;

    yield put(
      InternalStatusApiResponseSuccess(
        InternalStatusActionTypes.GET_INTERNAL_STATUS,
        { data }
      )
    );
  } catch (error: any) {
    yield put(
      InternalStatusApiResponseError(
        InternalStatusActionTypes.GET_INTERNAL_STATUS,
        error
      )
    );
    throw error;
  }
}

function* addInternalStatus({
  payload: { status_name, status_description },
}: any): SagaIterator {
  try {
    const response = yield call(addInternalStatusApi, {
      status_name,
      status_description,
    });
    const data: any = response.data.message;
    yield put(
      InternalStatusApiResponseSuccess(
        InternalStatusActionTypes.ADD_INTERNAL_STATUS,
        data
      )
    );
    yield put(getInternalStatusAction());
  } catch (error) {
    yield put(
      InternalStatusApiResponseError(
        InternalStatusActionTypes.ADD_INTERNAL_STATUS,
        error
      )
    );
    throw error;
  }
}

function* updateInternalStatus({
  payload: { id, status_name, status_description },
}: any): SagaIterator {
  try {
    const response = yield call(updateInternalStatusApi, id, {
      status_name,
      status_description,
    });
    const data = response.data.message;
    yield put(
      InternalStatusApiResponseSuccess(
        InternalStatusActionTypes.UPDATE_INTERNAL_STATUS,
        data
      )
    );
    yield put(getInternalStatusAction());
  } catch (error) {
    yield put(
      InternalStatusApiResponseError(
        InternalStatusActionTypes.UPDATE_INTERNAL_STATUS,
        error
      )
    );
    throw error;
  }
}

function* deleteInternalStatus({ payload: { id } }: any): SagaIterator {
  try {
    const response = yield call(deleteInternalStatusApi, id);
    const data = response.data.message;
    yield put(
      InternalStatusApiResponseSuccess(
        InternalStatusActionTypes.DELETE_INTERNAL_STATUS,
        data
      )
    );

    yield put(getInternalStatusAction());
  } catch (error) {
    yield put(
      InternalStatusApiResponseError(
        InternalStatusActionTypes.DELETE_INTERNAL_STATUS,
        error
      )
    );
    throw error;
  }
}

export function* watchGetInternalStatus(): any {
  yield takeEvery(
    InternalStatusActionTypes.GET_INTERNAL_STATUS,
    getInternalStatus
  );
}

export function* watchAddInternalStatus(): any {
  yield takeEvery(
    InternalStatusActionTypes.ADD_INTERNAL_STATUS,
    addInternalStatus
  );
}

export function* watchUpdateInternalStatus(): any {
  yield takeEvery(
    InternalStatusActionTypes.UPDATE_INTERNAL_STATUS,
    updateInternalStatus
  );
}

export function* watchDeleteInternalStatus() {
  yield takeEvery(
    InternalStatusActionTypes.DELETE_INTERNAL_STATUS,
    deleteInternalStatus
  );
}

function* internalStatusSaga() {
  yield all([
    fork(watchGetInternalStatus),
    fork(watchDeleteInternalStatus),
    fork(watchAddInternalStatus),
    fork(watchUpdateInternalStatus),
  ]);
}

export default internalStatusSaga;
