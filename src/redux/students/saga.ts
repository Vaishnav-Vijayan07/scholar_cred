import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// apicore
import { APICore } from "../../helpers/api/apiCore";

// helpers
import {
  createStudent as createStudentApi,
  updateStudent as updateStudentApi,
  getStudent as getStudentApi,
  getStudentById as getStudentByIdApi,
  deleteStudent as deleteStudentApi,
} from "../../helpers/";

// actions
import { studentApiResponseSuccess, studentStaffApiResponseError, getStudent } from "./actions";

// constants
import { StudentActionTypes } from "./constants";

interface ConsultantStaffData {
  payload: {
    student_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    country_of_origin: string;
    application_status: string;
  };
  type: string;
}

const api = new APICore();

function* createStudent({ payload: { first_name, last_name, email, phone, date_of_birth, country_of_origin, application_status }, type }: ConsultantStaffData): SagaIterator {
  try {
    const response = yield call(createStudentApi, {
      first_name,
      last_name,
      email,
      phone,
      date_of_birth,
      country_of_origin,
      application_status,
    });

    const consultant_data = response.data;

    yield put(studentApiResponseSuccess(StudentActionTypes.CREATE_STUDENT, consultant_data));
    yield put(getStudent());
  } catch (error: any) {
    yield put(studentStaffApiResponseError(StudentActionTypes.CREATE_STUDENT, error));
  }
}

function* getStudents(): SagaIterator {
  try {
    const response = yield call(getStudentApi);
    const data = response.data.data;

    // NOTE - You can change this according to response format from your api
    yield put(studentApiResponseSuccess(StudentActionTypes.GET_STUDENT, data));
  } catch (error: any) {
    yield put(studentStaffApiResponseError(StudentActionTypes.GET_STUDENT, error));
    throw error;
  }
}

function* getStudentById({ payload: { student_id } }: ConsultantStaffData): SagaIterator {
  try {
    const response = yield call(getStudentByIdApi, student_id);
    const data = response.data.data;

    // NOTE - You can change this according to response format from your api
    yield put(studentApiResponseSuccess(StudentActionTypes.GET_STUDENT_BY_ID, data));
  } catch (error: any) {
    yield put(studentStaffApiResponseError(StudentActionTypes.GET_STUDENT_BY_ID, error));
    throw error;
  }
}

function* updateStudent({
  payload: { student_id, first_name, last_name, email, phone, date_of_birth, country_of_origin, application_status },
  type,
}: ConsultantStaffData): SagaIterator {
  try {
    const response = yield call(updateStudentApi, student_id, {
      first_name,
      last_name,
      email,
      phone,
      date_of_birth,
      country_of_origin,
      application_status,
    });
    const consultant_data = response.data.message;

    yield put(studentApiResponseSuccess(StudentActionTypes.EDIT_STUDENT, consultant_data));
    yield put(getStudent());
  } catch (error: any) {
    yield put(studentStaffApiResponseError(StudentActionTypes.EDIT_STUDENT, error));
  }
}

function* deleteStudent({ payload: { student_id } }: ConsultantStaffData): SagaIterator {
  try {
    const response = yield call(deleteStudentApi, student_id);
    const data = response.data.message;

    yield put(studentApiResponseSuccess(StudentActionTypes.DELETE_STUDENT, data));
    // yield put(getConsultants());
    yield put(getStudent());
  } catch (error: any) {
    yield put(studentApiResponseSuccess(StudentActionTypes.DELETE_STUDENT, error));
    throw error;
  }
}

export function* watchGetAllStudents() {
  yield takeEvery(StudentActionTypes.GET_STUDENT, getStudents);
}
export function* watchgetStudentById() {
  yield takeEvery(StudentActionTypes.GET_STUDENT_BY_ID, getStudentById);
}

export function* watchCreateStudent() {
  yield takeEvery(StudentActionTypes.CREATE_STUDENT, createStudent);
}

export function* watchEditStudent() {
  yield takeEvery(StudentActionTypes.EDIT_STUDENT, updateStudent);
}

export function* watchDeleteStudent() {
  yield takeEvery(StudentActionTypes.DELETE_STUDENT, deleteStudent);
}

function* StudentSaga() {
  yield all([fork(watchGetAllStudents), fork(watchEditStudent), fork(watchCreateStudent), fork(watchDeleteStudent), fork(watchgetStudentById)]);
}

export default StudentSaga;
