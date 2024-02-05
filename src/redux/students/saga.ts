import { all, fork, put, takeEvery, call, select } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// apicore
import { APICore } from "../../helpers/api/apiCore";

// helpers
import {
  createStudent as createStudentApi,
  createStudentByCredStaff as createStudentByCredStaffApi,
  updateStudent as updateStudentApi,
  getStudent as getStudentApi,
  getStudentByStaff as getStudentByStaffApi,
  getStudentById as getStudentByIdApi,
  deleteStudent as deleteStudentApi,
  getStudentByCreated as getStudentByCreatedApi,
  getAssignedStudents as getAssignedStudentsApi,
  getStudentByConsultant as getStudentByConsultantApi,
} from "../../helpers/";

// actions
import { studentApiResponseSuccess, studentStaffApiResponseError, getStudent, getStudentByCreated, getStudentByStaff, getAllAssignedStudents, getStudentByConsultant } from "./actions";

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
    source: string;
    consultant_id: string;
  };
  type: string;
}

const api = new APICore();
// const user = api.getLoggedInUser();

function* createStudent({
  payload: { first_name, last_name, email, phone, date_of_birth, country_of_origin, application_status, source, consultant_id },
  type,
}: ConsultantStaffData): SagaIterator {
  try {
    const user = yield select((state) => state.Auth.user);
    const response = yield call(user?.role == "2" ? createStudentByCredStaffApi : createStudentApi, {
      first_name,
      last_name,
      email,
      phone,
      date_of_birth,
      country_of_origin,
      application_status,
      source,
      consultant_id,
    });

    const consultant_data = response.data.message;

    yield put(studentApiResponseSuccess(StudentActionTypes.CREATE_STUDENT, consultant_data));

    if (user.role == "4") {
      yield put(getStudentByCreated());
    } else if (user.role == "2") {
      yield put(getStudentByStaff());
    } else if (user.role == "7") {
      yield put(getStudentByConsultant(consultant_id));
    } else if (user.role == "1") {
      yield put(getStudent());
      // yield put(getAllAssignedStudents());
    } else {
      yield put(getStudent());
    }
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

function* getStudentsByStaff(): SagaIterator {
  try {
    const response = yield call(getStudentByStaffApi);
    const data = response.data.data;

    // NOTE - You can change this according to response format from your api
    yield put(studentApiResponseSuccess(StudentActionTypes.GET_STUDENT_BY_STAFF, data));
  } catch (error: any) {
    yield put(studentStaffApiResponseError(StudentActionTypes.GET_STUDENT_BY_STAFF, error));
    throw error;
  }
}

function* getStudentsByCreated(): SagaIterator {
  try {
    const response = yield call(getStudentByCreatedApi);
    const data = response.data.data;

    // NOTE - You can change this according to response format from your api
    yield put(studentApiResponseSuccess(StudentActionTypes.GET_STUDENT_BY_CREATED, data));
  } catch (error: any) {
    yield put(studentStaffApiResponseError(StudentActionTypes.GET_STUDENT_BY_CREATED, error));
    throw error;
  }
}

function* getAssignedStudents(): SagaIterator {
  try {
    const response = yield call(getAssignedStudentsApi);
    const data = response.data.data;

    // NOTE - You can change this according to response format from your api
    yield put(studentApiResponseSuccess(StudentActionTypes.GET_ASSIGNED_STUDENT, data));
  } catch (error: any) {
    yield put(studentStaffApiResponseError(StudentActionTypes.GET_ASSIGNED_STUDENT, error));
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

function* getStudentByConsultants({ payload: { consultant_id } }: ConsultantStaffData): SagaIterator {
  try {
    const response = yield call(getStudentByConsultantApi, consultant_id);
    const data = response.data.data;

    // NOTE - You can change this according to response format from your api
    yield put(studentApiResponseSuccess(StudentActionTypes.GET_STUDENT_BY_CONSULTANT, data));
  } catch (error: any) {
    yield put(studentStaffApiResponseError(StudentActionTypes.GET_STUDENT_BY_CONSULTANT, error));
    throw error;
  }
}

function* updateStudent({
  payload: { student_id, first_name, last_name, email, phone, date_of_birth, country_of_origin, application_status, source },
  type,
}: ConsultantStaffData): SagaIterator {
  try {
    const user = yield select((state) => state.Auth.user);
    const response = yield call(updateStudentApi, student_id, {
      first_name,
      last_name,
      email,
      phone,
      date_of_birth,
      country_of_origin,
      application_status,
      source,
    });
    const consultant_data = response.data.message;

    yield put(studentApiResponseSuccess(StudentActionTypes.EDIT_STUDENT, consultant_data));

    if (user.role == "4") {
      yield put(getStudentByCreated());
    } else if (user.role == "2") {
      yield put(getStudentByStaff());
    } else if (user.role == "7") {
      yield put(getStudentByConsultant(user?.consultant_id));
    } else if (user.role == "1") {
      yield put(getStudent());
    } else {
      yield put(getStudent());
    }
  } catch (error: any) {
    yield put(studentStaffApiResponseError(StudentActionTypes.EDIT_STUDENT, error));
  }
}

function* deleteStudent({ payload: { student_id } }: ConsultantStaffData): SagaIterator {
  try {
    const response = yield call(deleteStudentApi, student_id);
    const data = response.data.message;
    const user = yield select((state) => state.Auth.user);

    yield put(studentApiResponseSuccess(StudentActionTypes.DELETE_STUDENT, data));

    if (user.role == "4") {
      yield put(getStudentByCreated());
    } else if (user.role == "2") {
      yield put(getStudentByStaff());
    } else if (user.role == "7") {
      yield put(getStudentByConsultant(user?.consultant_id));
    } else if (user.role == "1") {
      yield put(getStudent());
    } else {
      yield put(getStudent());
    }
  } catch (error: any) {
    yield put(studentApiResponseSuccess(StudentActionTypes.DELETE_STUDENT, error));
    throw error;
  }
}

export function* watchGetAllStudents() {
  yield takeEvery(StudentActionTypes.GET_STUDENT, getStudents);
}
export function* watchGetStudentByStaff() {
  yield takeEvery(StudentActionTypes.GET_STUDENT_BY_STAFF, getStudentsByStaff);
}
export function* watchGetStudentByCreated() {
  yield takeEvery(StudentActionTypes.GET_STUDENT_BY_CREATED, getStudentsByCreated);
}
export function* watchGetAssignedStudent() {
  yield takeEvery(StudentActionTypes.GET_ASSIGNED_STUDENT, getAssignedStudents);
}
export function* watchgetStudentById() {
  yield takeEvery(StudentActionTypes.GET_STUDENT_BY_ID, getStudentById);
}

export function* watchgetStudentByConsultant() {
  yield takeEvery(StudentActionTypes.GET_STUDENT_BY_CONSULTANT, getStudentByConsultants);
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
  yield all([
    fork(watchGetAllStudents),
    fork(watchEditStudent),
    fork(watchCreateStudent),
    fork(watchDeleteStudent),
    fork(watchgetStudentById),
    fork(watchGetStudentByStaff),
    fork(watchGetStudentByCreated),
    fork(watchGetAssignedStudent),
    fork(watchgetStudentByConsultant),
  ]);
}

export default StudentSaga;
