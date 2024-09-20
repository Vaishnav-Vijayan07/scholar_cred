import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// actions
import {
  ebixStaffResponseSuccess,
  ebixStaffResponseError,
  getEbixUsers,
  getPayDetails,
} from "./actions";

// constants
import { EbixStaffActionTypes } from "./constants";
import {
  createEbixUsersApi,
  deleteEbixUsersApi,
  getCredEbixUsersApi,
  getEbixDocsApi,
  getEbixPayApi,
  getSwiftCopiesApi,
  updateBookingStatusApi,
  uploadSwiftCopyApi,
} from "../../helpers/api/ebix_staff";

interface EbixUserData {
  payload: {
    id: number;
    username: string;
    email: string;
    user_type_id: number;
    created_by: number;
    forex_id: string;
    student_id: string;
    file: File;
    status: string;
  };
  type: string;
}

function* createEbixStaff({
  payload: { username, email, user_type_id, created_by },
  type,
}: EbixUserData): SagaIterator {
  try {
    const response = yield call(createEbixUsersApi, {
      username,
      email,
      user_type_id,
      created_by,
    });
    const EbixUserData = response.data.message;
    // NOTE - You can change this according to response format from your api

    yield put(
      ebixStaffResponseSuccess(
        EbixStaffActionTypes.CREATE_EBIX_STAFF,
        EbixUserData
      )
    );
    yield put(getEbixUsers());
  } catch (error: any) {
    yield put(
      ebixStaffResponseError(EbixStaffActionTypes.CREATE_EBIX_STAFF, error)
    );
  }
}

function* getEbixStaff(): SagaIterator {
  try {
    const response = yield call(getCredEbixUsersApi);
    const EbixUserData = response.data.data;

    yield put(
      ebixStaffResponseSuccess(
        EbixStaffActionTypes.GET_EBIX_STAFF,
        EbixUserData
      )
    );
  } catch (error: any) {
    yield put(
      ebixStaffResponseError(EbixStaffActionTypes.GET_EBIX_STAFF, error)
    );
  }
}

function* getEbixStaffDocs(): SagaIterator {
  try {
    const response = yield call(getEbixDocsApi);
    const EbixDocs = response.data.data;

    yield put(
      ebixStaffResponseSuccess(EbixStaffActionTypes.GET_DOCS, EbixDocs)
    );
  } catch (error: any) {
    yield put(ebixStaffResponseError(EbixStaffActionTypes.GET_DOCS, error));
  }
}

function* getSwift(): SagaIterator {
  try {
    const response = yield call(getSwiftCopiesApi);
    const SwiftCopies = response.data.data;

    yield put(
      ebixStaffResponseSuccess(EbixStaffActionTypes.GET_SWIFT, SwiftCopies)
    );
  } catch (error: any) {
    yield put(ebixStaffResponseError(EbixStaffActionTypes.GET_SWIFT, error));
  }
}

function* uploadSwiftCopy({
  payload: { file, forex_id, student_id },
}: EbixUserData): SagaIterator {
  try {
    const response = yield call(uploadSwiftCopyApi, {
      file,
      forex_id,
      student_id,
    });
    const swiftUrl = response.data.data;

    yield put(
      ebixStaffResponseSuccess(EbixStaffActionTypes.UPLOAD_SWIFT, swiftUrl)
    );

    yield put(getPayDetails(forex_id));
  } catch (error: any) {
    yield put(ebixStaffResponseError(EbixStaffActionTypes.UPLOAD_SWIFT, error));
  }
}

function* updateBookingStatus({
  payload: { status, forex_id, student_id },
}: EbixUserData): SagaIterator {
  try {
    const response = yield call(updateBookingStatusApi, {
      status,
      forex_id,
      student_id,
    });
    const payDetails = response.data.data;

    yield put(
      ebixStaffResponseSuccess(
        EbixStaffActionTypes.UPDATE_BOOKING_STATUS,
        payDetails
      )
    );

    yield put(getPayDetails(forex_id));
  } catch (error: any) {
    yield put(
      ebixStaffResponseError(EbixStaffActionTypes.UPDATE_BOOKING_STATUS, error)
    );
  }
}

function* deleteEbixStaff({ payload: { id } }: EbixUserData): SagaIterator {
  try {
    const response = yield call(deleteEbixUsersApi, id);
    const EbixUserData = response.data.message;
    // NOTE - You can change this according to response format from your api

    yield put(
      ebixStaffResponseSuccess(
        EbixStaffActionTypes.DELETE_EBIX_STAFF,
        EbixUserData
      )
    );
    yield put(getEbixUsers());
  } catch (error: any) {
    yield put(
      ebixStaffResponseError(EbixStaffActionTypes.DELETE_EBIX_STAFF, error)
    );
  }
}

function* getEbixPayDetails({
  payload: { forex_id },
}: EbixUserData): SagaIterator {
  try {
    const response = yield call(getEbixPayApi, forex_id);
    const payDetails = response.data.data;

    yield put(
      ebixStaffResponseSuccess(EbixStaffActionTypes.GET_DETAILS, payDetails)
    );
  } catch (error: any) {
    yield put(ebixStaffResponseError(EbixStaffActionTypes.GET_DETAILS, error));
  }
}

export function* watchCreateEbixUser() {
  yield takeEvery(EbixStaffActionTypes.CREATE_EBIX_STAFF, createEbixStaff);
}

export function* watchUploadSwiftCopy() {
  yield takeEvery(EbixStaffActionTypes.UPLOAD_SWIFT, uploadSwiftCopy);
}

export function* watchGetEbixUser() {
  yield takeEvery(EbixStaffActionTypes.GET_EBIX_STAFF, getEbixStaff);
}

export function* watchGetEbixUserDocs() {
  yield takeEvery(EbixStaffActionTypes.GET_DOCS, getEbixStaffDocs);
}

export function* watchGetEbixSwiftCopies() {
  yield takeEvery(EbixStaffActionTypes.GET_SWIFT, getSwift);
}

export function* watchGetEbixUserPay() {
  yield takeEvery(EbixStaffActionTypes.GET_DETAILS, getEbixPayDetails);
}

export function* watchDeleteEbixUser() {
  yield takeEvery(EbixStaffActionTypes.DELETE_EBIX_STAFF, deleteEbixStaff);
}

export function* watchUpdateBookingStatus() {
  yield takeEvery(
    EbixStaffActionTypes.UPDATE_BOOKING_STATUS,
    updateBookingStatus
  );
}

function* ebixStaffSaga() {
  yield all([
    fork(watchCreateEbixUser),
    fork(watchDeleteEbixUser),
    fork(watchGetEbixUser),
    fork(watchGetEbixUserDocs),
    fork(watchGetEbixUserPay),
    fork(watchUploadSwiftCopy),
    fork(watchGetEbixSwiftCopies),
    fork(watchUpdateBookingStatus),
  ]);
}

export default ebixStaffSaga;
