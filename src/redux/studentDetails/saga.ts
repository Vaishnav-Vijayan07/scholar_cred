import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// apicore
import { APICore } from "../../helpers/api/apiCore";

// helpers
import { savePreliminaryDetails as savePreliminaryDetailsApi, saveSecuredDetailedScreeningData as saveSecuredDetailedScreeningDataApi } from "../../helpers/";

// actions
import { studentDetailsApiResponseSuccess, studentDetailsApiResponseError } from "./actions";

// constants
import { StudentDetailsActionTypes } from "./constants";

interface ConsultantData {
  payload: {
    student_id: string;
    name: string;
    email: string;
    whatsapp_number: string;
    destination_country: string;
    application_status: string;
    program_type: string;
    university_details: string;
    primary_applicant: string;
    type_of_profession: string;
    salary_range: string;
    collateral_item: string;
    remark: string;

    scored_below_60: string;
    univerist_rank: string;
    program_types: string;
    any_existing_ongoing_loans: string;
    any_history_of_know_defaults: string;
    know_the_current_cibil: string;
    cibil: string;
    realtionship_with_student: string;
    place_of_residence: string;
    pan_and_aadhar_available: string;
    professional_background: string;
    salaryrange: string;
    proof_of_income: string;
    know_the_current_cibil_co_applicant: string;
    cibil_co_applicant: string;
  };
  type: string;
}

const api = new APICore();

function* savePreliminaryDetails({
  payload: {
    student_id,
    name,
    email,
    whatsapp_number,
    destination_country,
    application_status,
    program_type,
    university_details,
    primary_applicant,
    type_of_profession,
    salary_range,
    collateral_item,
    remark,
  },
  type,
}: ConsultantData): SagaIterator {
  try {
    const response = yield call(savePreliminaryDetailsApi, {
      student_id,
      name,
      email,
      whatsapp_number,
      destination_country,
      application_status,
      program_type,
      university_details,
      primary_applicant,
      type_of_profession,
      salary_range,
      collateral_item,
      remark,
    });

    const consultant_data = response.data.message;

    yield put(studentDetailsApiResponseSuccess(StudentDetailsActionTypes.SAVE_PRELIMINARY_DETAILS, consultant_data));
    //calling get method after successfull api creation
    // yield put(getComment(student_id));
  } catch (error: any) {
    yield put(studentDetailsApiResponseError(StudentDetailsActionTypes.SAVE_PRELIMINARY_DETAILS, error));
  }
}

function* saveSecuredDetailedScreeningData({
  payload: {
    student_id,
    scored_below_60,
    univerist_rank,
    program_types,
    any_existing_ongoing_loans,
    any_history_of_know_defaults,
    know_the_current_cibil,
    cibil,
    realtionship_with_student,
    place_of_residence,
    pan_and_aadhar_available,
    professional_background,
    salaryrange,
    proof_of_income,
    know_the_current_cibil_co_applicant,
    cibil_co_applicant,
  },
  type,
}: ConsultantData): SagaIterator {
  try {
    const response = yield call(saveSecuredDetailedScreeningDataApi, {
      student_id,
      scored_below_60,
      univerist_rank,
      program_types,
      any_existing_ongoing_loans,
      any_history_of_know_defaults,
      know_the_current_cibil,
      cibil,
      realtionship_with_student,
      place_of_residence,
      pan_and_aadhar_available,
      professional_background,
      salaryrange,
      proof_of_income,
      know_the_current_cibil_co_applicant,
      cibil_co_applicant,
    });

    const data = response.data.message;

    yield put(studentDetailsApiResponseSuccess(StudentDetailsActionTypes.SAVE_SECURED_DETAILS, data));
    //calling get method after successfull api creation
    // yield put(getComment(student_id));
  } catch (error: any) {
    yield put(studentDetailsApiResponseError(StudentDetailsActionTypes.SAVE_SECURED_DETAILS, error));
  }
}

export function* watchSavePreliminaryDetails() {
  yield takeEvery(StudentDetailsActionTypes.SAVE_PRELIMINARY_DETAILS, savePreliminaryDetails);
}

export function* watchSaveSecuredDetailedScreeningData() {
  yield takeEvery(StudentDetailsActionTypes.SAVE_SECURED_DETAILS, saveSecuredDetailedScreeningData);
}

function* studentDetailsSaga() {
  yield all([fork(watchSavePreliminaryDetails), fork(watchSaveSecuredDetailedScreeningData)]);
}

export default studentDetailsSaga;
