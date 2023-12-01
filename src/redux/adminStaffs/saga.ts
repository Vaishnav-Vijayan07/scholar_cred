import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// apicore
import { APICore } from "../../helpers/api/apiCore";

// helpers
import {
  createAdminStaff as createAdminStaffApi,
  updateAdminStaff as updateAdminStaffApi,
  getAdminStaff as getAdminStaffApi,
  getAdminUsersById as getAdminUsersById,
  deleteAdminStaff as deleteAdminStaffApi,
} from "../../helpers";

// actions
import { adminStaffApiResponseSuccess, adminStaffApiResponseError, getAdminStaff } from "./actions";

// constants
import { AdminStaffActionTypes } from "./constants";

interface AdminStaffData {
  payload: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    image: string;
    employee_id: string;
    created_by: number;
  };
  type: string;
}

function* createAdminStaff({ payload: { first_name, last_name, email, phone, image, employee_id, created_by }, type }: AdminStaffData): SagaIterator {
  try {
    const response = yield call(createAdminStaffApi, {
      first_name,
      last_name,
      email,
      phone,
      image,
      employee_id,
      created_by,
    });

    const data = response.data.message;

    yield put(adminStaffApiResponseSuccess(AdminStaffActionTypes.CREATE_ADMIN_STAFF, data));
    //calling get method after successfull api creation
    yield put(getAdminStaff());
  } catch (error: any) {
    yield put(adminStaffApiResponseError(AdminStaffActionTypes.CREATE_ADMIN_STAFF, error));
  }
}

function* getAdminStaffs(): SagaIterator {
  try {
    const response = yield call(getAdminStaffApi);
    const data = response.data.data;

    console.log("data", data);

    // NOTE - You can change this according to response format from your api
    yield put(adminStaffApiResponseSuccess(AdminStaffActionTypes.GET_ADMIN_STAFF, { data }));
  } catch (error: any) {
    yield put(adminStaffApiResponseError(AdminStaffActionTypes.GET_ADMIN_STAFF, error));
    throw error;
  }
}

function* updateAdminStaff({ payload: { id, first_name, last_name, email, phone, image, employee_id, created_by }, type }: AdminStaffData): SagaIterator {
  try {
    const response = yield call(updateAdminStaffApi, id, {
      first_name,
      last_name,
      email,
      phone,
      image,
      employee_id,
      created_by,
    });
    const data = response.data.message;

    yield put(adminStaffApiResponseSuccess(AdminStaffActionTypes.EDIT_ADMIN_STAFF, data));
    yield put(getAdminStaff());
  } catch (error: any) {
    yield put(adminStaffApiResponseError(AdminStaffActionTypes.EDIT_ADMIN_STAFF, error));
  }
}

function* deleteAdminStaff({ payload: { id } }: AdminStaffData): SagaIterator {
  try {
    const response = yield call(deleteAdminStaffApi, id);
    const data = response.data.message;

    yield put(adminStaffApiResponseSuccess(AdminStaffActionTypes.DELETE_ADMIN_STAFF, data));
    yield put(getAdminStaff());
  } catch (error: any) {
    yield put(adminStaffApiResponseSuccess(AdminStaffActionTypes.DELETE_ADMIN_STAFF, error));
    throw error;
  }
}

export function* watchGetAllAdminStaff() {
  yield takeEvery(AdminStaffActionTypes.GET_ADMIN_STAFF, getAdminStaffs);
}

export function* watchCreateAdminStaff() {
  yield takeEvery(AdminStaffActionTypes.CREATE_ADMIN_STAFF, createAdminStaff);
}

export function* watchEditAdminStaff() {
  yield takeEvery(AdminStaffActionTypes.EDIT_ADMIN_STAFF, updateAdminStaff);
}

export function* watchDeleteAdminStaff() {
  yield takeEvery(AdminStaffActionTypes.DELETE_ADMIN_STAFF, deleteAdminStaff);
}

function* AdminStafftSaga() {
  yield all([fork(watchGetAllAdminStaff), fork(watchEditAdminStaff), fork(watchCreateAdminStaff), fork(watchGetAllAdminStaff), fork(watchDeleteAdminStaff)]);
}

export default AdminStafftSaga;
