import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// helpers
import {
  createConsultantStaff as createConsultantStaffApi,
  updateConsultantStaff as updateConsultantStaffApi,
  getConsultantStaff as getConsultantStaffApi,
  deleteConsultantStaff as deleteConsultantStaffApi,
} from "../../helpers";

// actions
import { ConsultantStaffApiResponseSuccess, ConsultantStaffApiResponseError, getConsultantStaff } from "./actions";

// constants
import { ConsultantStaffActionTypes } from "./constants";

interface ConsultantStaffData {
  payload: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone: string;
    image: string;
    employee_id: string;
    created_by: number;
    consultant_id: string;
  };
  type: string;
}

function* createConsultantStaff({
  payload: { first_name, last_name, username, email, phone, image, employee_id, created_by, consultant_id },
  type,
}: ConsultantStaffData): SagaIterator {
  try {
    const response = yield call(createConsultantStaffApi, {
      first_name,
      last_name,
      username,
      email,
      phone,
      image,
      employee_id,
      created_by,
      consultant_id,
    });

    const data = response.data.message;

    yield put(ConsultantStaffApiResponseSuccess(ConsultantStaffActionTypes.CREATE_CONSULTANT_STAFF, data));
    //calling get method after successfull api creation
    yield put(getConsultantStaff());
  } catch (error: any) {
    yield put(ConsultantStaffApiResponseError(ConsultantStaffActionTypes.CREATE_CONSULTANT_STAFF, error));
  }
}

function* getConsultantStaffs({ payload: { consultant_id } }: ConsultantStaffData): SagaIterator {
  try {
    const response = yield call(getConsultantStaffApi, consultant_id);
    const data = response.data.data;

    // NOTE - You can change this according to response format from your api
    yield put(ConsultantStaffApiResponseSuccess(ConsultantStaffActionTypes.GET_CONSULTANT_STAFF, { data }));
  } catch (error: any) {
    yield put(ConsultantStaffApiResponseError(ConsultantStaffActionTypes.GET_CONSULTANT_STAFF, error));
    throw error;
  }
}

function* updateConsultantStaff({
  payload: { id, first_name, last_name, username, email, phone, image, employee_id, created_by, consultant_id },
  type,
}: ConsultantStaffData): SagaIterator {
  try {
    const response = yield call(updateConsultantStaffApi, id, {
      first_name,
      last_name,
      username,
      email,
      phone,
      image,
      employee_id,
      created_by,
      consultant_id,
    });
    const data = response.data.message;

    yield put(ConsultantStaffApiResponseSuccess(ConsultantStaffActionTypes.EDIT_CONSULTANT_STAFF, data));
    yield put(getConsultantStaff());
  } catch (error: any) {
    yield put(ConsultantStaffApiResponseError(ConsultantStaffActionTypes.EDIT_CONSULTANT_STAFF, error));
  }
}

function* deleteConsultantStaff({ payload: { id } }: ConsultantStaffData): SagaIterator {
  try {
    const response = yield call(deleteConsultantStaffApi, id);
    const data = response.data.message;

    yield put(ConsultantStaffApiResponseSuccess(ConsultantStaffActionTypes.DELETE_CONSULTANT_STAFF, data));
    yield put(getConsultantStaff());
  } catch (error: any) {
    yield put(ConsultantStaffApiResponseSuccess(ConsultantStaffActionTypes.DELETE_CONSULTANT_STAFF, error));
    throw error;
  }
}

export function* watchGetAllAdminStaff() {
  yield takeEvery(ConsultantStaffActionTypes.GET_CONSULTANT_STAFF, getConsultantStaffs);
}

export function* watchCreateAdminStaff() {
  yield takeEvery(ConsultantStaffActionTypes.CREATE_CONSULTANT_STAFF, createConsultantStaff);
}

export function* watchEditAdminStaff() {
  yield takeEvery(ConsultantStaffActionTypes.EDIT_CONSULTANT_STAFF, updateConsultantStaff);
}

export function* watchDeleteAdminStaff() {
  yield takeEvery(ConsultantStaffActionTypes.DELETE_CONSULTANT_STAFF, deleteConsultantStaff);
}

function* AdminStafftSaga() {
  yield all([fork(watchGetAllAdminStaff), fork(watchEditAdminStaff), fork(watchCreateAdminStaff), fork(watchGetAllAdminStaff), fork(watchDeleteAdminStaff)]);
}

export default AdminStafftSaga;
