import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// apicore
import { APICore, setAuthorization } from "../../helpers/api/apiCore";

// helpers
import {
  createConsultant as createConsultantApi,
  updateConsultant as updateConsultantApi,
  getConsultants as getConsultantsApi,
  getConsultantsById as getConsultantsByIdApi,
  deleteConsultant as deleteConsultantApi,
} from "../../helpers/";

// actions
import { consultantApiResponseSuccess, consultantApiResponseError, getConsultants } from "./actions";

// constants
import { ConsultantActionTypes } from "./constants";

interface ConsultantData {
  payload: {
    id: number;
    company_name: string;
    business_address: string;
    email: string;
    phone: string;
    image_url: string;
    alternative_phone: string;
    gst: string;
    location: string;
    pin_code: string;
    pan_no: string;
    created_by: number;
  };
  type: string;
}

const api = new APICore();

function* createConsultant({
  payload: { company_name, business_address, email, phone, image_url, alternative_phone, gst, location, pin_code, pan_no, created_by },
  type,
}: ConsultantData): SagaIterator {
  try {
    const response = yield call(createConsultantApi, {
      company_name,
      business_address,
      email,
      phone,
      image_url,
      alternative_phone,
      gst,
      location,
      pin_code,
      pan_no,
      created_by,
    });

    const consultant_data = response.data.message;

    yield put(consultantApiResponseSuccess(ConsultantActionTypes.CREATE_CONSULTANT, consultant_data));
    //calling get method after successfull api creation
    yield put(getConsultants());
  } catch (error: any) {
    yield put(consultantApiResponseError(ConsultantActionTypes.CREATE_CONSULTANT, error));
  }
}

function* getConsultant(): SagaIterator {
  try {
    const response = yield call(getConsultantsApi);
    const data = response.data.data;

    console.log("data", data);

    // NOTE - You can change this according to response format from your api
    yield put(consultantApiResponseSuccess(ConsultantActionTypes.GET_CONSULTANT, { data }));
  } catch (error: any) {
    yield put(consultantApiResponseError(ConsultantActionTypes.GET_CONSULTANT, error));
    throw error;
  }
}

function* updateConsultant({
  payload: { id, company_name, business_address, email, phone, image_url, alternative_phone, gst, location, pin_code, pan_no, created_by },
  type,
}: ConsultantData): SagaIterator {
  try {
    console.log("formDatas--------->", id, company_name, business_address, email, phone, image_url, alternative_phone, gst, location, pin_code, pan_no, created_by);

    const response = yield call(updateConsultantApi, id, {
      company_name,
      business_address,
      email,
      phone,
      image_url,
      alternative_phone,
      gst,
      location,
      pin_code,
      pan_no,
      created_by,
    });
    const consultant_data = response.data.message;

    console.log("uodate consultant_data", consultant_data);

    yield put(consultantApiResponseSuccess(ConsultantActionTypes.EDIT_CONSULTANT, consultant_data));
    yield put(getConsultants());
  } catch (error: any) {
    yield put(consultantApiResponseError(ConsultantActionTypes.EDIT_CONSULTANT, error));
  }
}

function* deleteConsultant({ payload: { id } }: ConsultantData): SagaIterator {
  try {
    const response = yield call(deleteConsultantApi, id);
    const data = response.data.message;

    yield put(consultantApiResponseSuccess(ConsultantActionTypes.DELETE_CONSULTANT, data));
    yield put(getConsultants());
  } catch (error: any) {
    yield put(consultantApiResponseSuccess(ConsultantActionTypes.DELETE_CONSULTANT, error));
    throw error;
  }
}

export function* watchGetAllConsultant() {
  yield takeEvery(ConsultantActionTypes.GET_CONSULTANT, getConsultant);
}

export function* watchCreateConsultant() {
  yield takeEvery(ConsultantActionTypes.CREATE_CONSULTANT, createConsultant);
}

export function* watchEditConsultant() {
  yield takeEvery(ConsultantActionTypes.EDIT_CONSULTANT, updateConsultant);
}

export function* watchDeleteConsultant() {
  yield takeEvery(ConsultantActionTypes.DELETE_CONSULTANT, deleteConsultant);
}

function* consultantSaga() {
  yield all([fork(watchGetAllConsultant), fork(watchEditConsultant), fork(watchCreateConsultant), fork(watchGetAllConsultant), fork(watchDeleteConsultant)]);
}

export default consultantSaga;
