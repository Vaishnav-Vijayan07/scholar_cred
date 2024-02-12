import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// apicore
import { APICore } from "../../helpers/api/apiCore";

// helpers
import {
  getLoanStatus as getLoanStatusApi,
  addLoanStatus as addLoanStatusApi,
  updateLoanStatus as updateLoanStatusApi,
  deleteLoanStatus as deleteLoanStatusApi,
} from "../../helpers/";

// actions
import {
  LoanStatusApiResponseSuccess,
  LoanStatusApiResponseError,
  getLoanStatus,
} from "./actions";

// constants
import { LoanStatusActionTypes } from "./constants";

interface StatusData {
  payload: {
    id: string;
    status_name: string;
    status_description: string;
    status_type: "Internal" | "External";
    is_visible: string | boolean;
  };
  type: string;
}

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* getLoanStatuses(): SagaIterator {
  try {
    const response = yield call(getLoanStatusApi);
    const data = response.data;

    // NOTE - You can change this according to response format from your api
    yield put(
      LoanStatusApiResponseSuccess(LoanStatusActionTypes.GET_LOAN_STATUS, {
        data,
      })
    );
  } catch (error: any) {
    console.log("Error", error);
    yield put(
      LoanStatusApiResponseError(LoanStatusActionTypes.GET_LOAN_STATUS, error)
    );
    throw error;
  }
}

function* addLoanStatus({
  payload: { status_name, status_description, status_type, is_visible },
}: StatusData): SagaIterator {
  try {
    const response = yield call(addLoanStatusApi, {
      status_name,
      status_description,
      status_type,
      is_visible,
    });
    const data = response.data;

    yield put(
      LoanStatusApiResponseSuccess(
        LoanStatusActionTypes.ADD_LOAN_STATUS,
        data.message
      )
    );

    yield put(getLoanStatus());
  } catch (error: any) {
    console.log("err", error);

    yield put(
      LoanStatusApiResponseError(LoanStatusActionTypes.ADD_LOAN_STATUS, error)
    );
    throw error;
  }
}

function* updateLoanStatus({
  payload: { id, status_name, status_description  ,status_type, is_visible},
}: StatusData): SagaIterator {
  try {
    const response = yield call(updateLoanStatusApi, id, {
      status_name,
      status_description,
      status_type,
      is_visible,

    });
    const data = response.data.message;

    yield put(
      LoanStatusApiResponseSuccess(
        LoanStatusActionTypes.UPDATE_LOAN_STATUS,
        data
      )
    );
    yield put(getLoanStatus());
  } catch (error: any) {
    yield put(
      LoanStatusApiResponseSuccess(
        LoanStatusActionTypes.UPDATE_LOAN_STATUS,
        error
      )
    );
    throw error;
  }
}

function* deleteLoanStatus({ payload: { id } }: StatusData): SagaIterator {
  try {
    const response = yield call(deleteLoanStatusApi, id);
    const data = response.data.message;

    yield put(
      LoanStatusApiResponseSuccess(
        LoanStatusActionTypes.DELETE_LOAN_STATUS,
        data
      )
    );
    yield put(getLoanStatus());
  } catch (error: any) {
    yield put(
      LoanStatusApiResponseError(
        LoanStatusActionTypes.DELETE_LOAN_STATUS,
        error
      )
    );
    throw error;
  }
}

export function* watchGetLoanStatus() {
  yield takeEvery(LoanStatusActionTypes.GET_LOAN_STATUS, getLoanStatuses);
}

export function* watchaddLoanStatus() {
  yield takeEvery(LoanStatusActionTypes.ADD_LOAN_STATUS, addLoanStatus);
}

export function* watchUpdateLoanStatus(): any {
  yield takeEvery(LoanStatusActionTypes.UPDATE_LOAN_STATUS, updateLoanStatus);
}

export function* watchDeleteLoanStatus(): any {
  yield takeEvery(LoanStatusActionTypes.DELETE_LOAN_STATUS, deleteLoanStatus);
}

function* LoanStatusSaga() {
  yield all([
    fork(watchGetLoanStatus),
    fork(watchaddLoanStatus),
    fork(watchUpdateLoanStatus),
    fork(watchDeleteLoanStatus),
  ]);
}

export default LoanStatusSaga;
