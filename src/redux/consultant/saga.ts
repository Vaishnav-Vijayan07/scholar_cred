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
import { authApiResponseSuccess, authApiResponseError } from "./actions";

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

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* updateConsultant({
  payload: {
    id,
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
  },
  type,
}: ConsultantData): SagaIterator {
  try {
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
    const consultant_data = response.data;
    // NOTE - You can change this according to response format from your api
    api.setLoggedInUser(consultant_data);
    setAuthorization(consultant_data["token"]);
    yield put(
      authApiResponseSuccess(
        ConsultantActionTypes.EDIT_CONSULTANT,
        consultant_data
      )
    );
  } catch (error: any) {
    yield put(
      authApiResponseError(ConsultantActionTypes.EDIT_CONSULTANT, error)
    );
    api.setLoggedInUser(null);
    setAuthorization(null);
  }
}

function* createConsultant({
  payload: {
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
  },
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
    const consultant_data = response.data;
    // NOTE - You can change this according to response format from your api
    api.setLoggedInUser(consultant_data);
    setAuthorization(consultant_data["token"]);
    yield put(
      authApiResponseSuccess(
        ConsultantActionTypes.CREATE_CONSULTANT,
        consultant_data
      )
    );
  } catch (error: any) {
    yield put(
      authApiResponseError(ConsultantActionTypes.CREATE_CONSULTANT, error)
    );
    api.setLoggedInUser(null);
    setAuthorization(null);
  }
}

export function* watchEditConsultant() {
  yield takeEvery(ConsultantActionTypes.EDIT_CONSULTANT, updateConsultant);
}

export function* watchCreateConsultant() {
  yield takeEvery(ConsultantActionTypes.CREATE_CONSULTANT, createConsultant);
}

function* consultantSaga() {
  yield all([fork(watchEditConsultant), fork(watchCreateConsultant)]);
}

export default consultantSaga;
