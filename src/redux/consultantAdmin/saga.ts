import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// apicore
import { APICore } from "../../helpers/api/apiCore";

// helpers
import {
  createConsultantStaff as createConsultantStaffApi,
  updateConsultantStaff as updateConsultantStaffApi,
  getConsultantStaff as getConsultantStaffApi,
  getConsultantStaffById as getConsultantStaffByIdApi,
  deleteConsultantStaff as deleteConsultantStaffApi,
} from "../../helpers";

// actions
import { consultantStaffApiResponseSuccess, consultantStaffApiResponseError, getConsultantStaff } from "./actions";

// constants
import { ConsultantStaffActionTypes } from "./constants";

interface ConsultantStaffData {
  payload: {
    id: number;
    username: string;
    email: string;
    full_name: string;
    user_type_id: string;
    user_type: string;
    consultant_id: string;
  };
  type: string;
}

const api = new APICore();

function* createConsultantStaff({ payload: { username, email, full_name, user_type_id, consultant_id }, type }: ConsultantStaffData): SagaIterator {
  try {
    const response = yield call(createConsultantStaffApi, {
      username,
      email,
      full_name,
      user_type_id,
      consultant_id,
    });

    const consultant_data = response.data;

    yield put(consultantStaffApiResponseSuccess(ConsultantStaffActionTypes.CREATE_CONSULTANT_STAFF, consultant_data));
    //calling get method after successfull api creation
    // yield put(getConsultants());
    yield put(getConsultantStaff(user_type_id, consultant_id));
  } catch (error: any) {
    yield put(consultantStaffApiResponseError(ConsultantStaffActionTypes.CREATE_CONSULTANT_STAFF, error));
  }
}

function* getConsultantStaffs({ payload: { user_type, consultant_id }, type }: ConsultantStaffData): SagaIterator {
  try {
    const response = yield call(getConsultantStaffApi, {
      user_type,
      consultant_id,
    });
    const data = response.data.data;

    // NOTE - You can change this according to response format from your api
    yield put(consultantStaffApiResponseSuccess(ConsultantStaffActionTypes.GET_CONSULTANT_STAFF, { data }));
  } catch (error: any) {
    yield put(consultantStaffApiResponseError(ConsultantStaffActionTypes.GET_CONSULTANT_STAFF, error));
    throw error;
  }
}

function* getConsultantStaffById({ payload: { id } }: ConsultantStaffData): SagaIterator {
  try {
    const response = yield call(getConsultantStaffByIdApi, id);
    const data = response.data.data;

    // NOTE - You can change this according to response format from your api
    yield put(consultantStaffApiResponseSuccess(ConsultantStaffActionTypes.GET_CONSULTANT_STAFF_BY_ID, { data }));
  } catch (error: any) {
    yield put(consultantStaffApiResponseError(ConsultantStaffActionTypes.GET_CONSULTANT_STAFF_BY_ID, error));
    throw error;
  }
}

function* updateConsultantStaff({ payload: { id, username, email, full_name, user_type_id, consultant_id }, type }: ConsultantStaffData): SagaIterator {
  try {
    const response = yield call(updateConsultantStaffApi, id, {
      username,
      email,
      full_name,
      user_type_id,
      consultant_id,
    });
    const consultant_data = response.data.message;

    yield put(consultantStaffApiResponseSuccess(ConsultantStaffActionTypes.EDIT_CONSULTANT_STAFF, consultant_data));
    yield put(getConsultantStaff(user_type_id, consultant_id));
  } catch (error: any) {
    yield put(consultantStaffApiResponseError(ConsultantStaffActionTypes.EDIT_CONSULTANT_STAFF, error));
  }
}

function* deleteConsultantStaff({ payload: { id, user_type, consultant_id } }: ConsultantStaffData): SagaIterator {
  try {
    const response = yield call(deleteConsultantStaffApi, id);
    const data = response.data.message;

    yield put(consultantStaffApiResponseSuccess(ConsultantStaffActionTypes.DELETE_CONSULTANT_STAFF, data));
    // yield put(getConsultants());
    yield put(getConsultantStaff(user_type, consultant_id));
  } catch (error: any) {
    yield put(consultantStaffApiResponseSuccess(ConsultantStaffActionTypes.DELETE_CONSULTANT_STAFF, error));
    throw error;
  }
}

export function* watchGetAllConsultantStaff() {
  yield takeEvery(ConsultantStaffActionTypes.GET_CONSULTANT_STAFF, getConsultantStaffs);
}
export function* watchGetConsultantStaffById() {
  yield takeEvery(ConsultantStaffActionTypes.GET_CONSULTANT_STAFF_BY_ID, getConsultantStaffById);
}

export function* watchCreateConsultantStaff() {
  yield takeEvery(ConsultantStaffActionTypes.CREATE_CONSULTANT_STAFF, createConsultantStaff);
}

export function* watchEditConsultantStaff() {
  yield takeEvery(ConsultantStaffActionTypes.EDIT_CONSULTANT_STAFF, updateConsultantStaff);
}

export function* watchDeleteConsultantStaff() {
  yield takeEvery(ConsultantStaffActionTypes.DELETE_CONSULTANT_STAFF, deleteConsultantStaff);
}

function* consultantStaffSaga() {
  yield all([
    fork(watchGetAllConsultantStaff),
    fork(watchEditConsultantStaff),
    fork(watchCreateConsultantStaff),
    fork(watchDeleteConsultantStaff),
    fork(watchGetConsultantStaffById),
  ]);
}

export default consultantStaffSaga;
