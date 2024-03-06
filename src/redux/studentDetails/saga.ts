import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";

// apicore
import { APICore } from "../../helpers/api/apiCore";

// helpers
import {
  savePreliminaryDetails as savePreliminaryDetailsApi,
  saveSecuredDetailedScreeningData as saveSecuredDetailedScreeningDataApi,
  saveUnSecuredDetailedScreeningData as saveUnSecuredDetailedScreeningDataApi,
  checkLoanType as checkLoanTypeApi,
} from "../../helpers/";

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

    academic_scores_10th: string;
    academic_scores_12th: string;
    academic_scores_ug: string;
    marital_status: string;
    age: string;
    country: string;
    rank: string;
    loan_amount_required: string;
    any_existing_loans: string;
    any_history_of_defaults: string;
    do_you_know_current_cibil: string;
    current_cibil: string;
    relationship_with_student: string;
    coapplicant_place: string;
    know_cibil_score: string;
    father_cibil: string;
    any_loan_exisiting: string;
    history_of_defaults: string;
    current_cibil_score: string;
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

    const checkAvailability = yield call(checkLoanTypeApi, {
      student_id,
    });

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

function* saveUnSecuredDetailedScreeningData({
  payload: {
    student_id,
    academic_scores_10th,
    academic_scores_12th,
    academic_scores_ug,
    marital_status,
    age,
    program_type,
    country,
    rank,
    loan_amount_required,
    any_existing_loans,
    any_history_of_defaults,
    do_you_know_current_cibil,
    current_cibil,
    relationship_with_student,
    coapplicant_place,
    pan_and_aadhar_available,
    professional_background,
    salary_range,
    proof_of_income,
    know_cibil_score,
    father_cibil,
    any_loan_exisiting,
    history_of_defaults,
    current_cibil_score,
  },
  type,
}: ConsultantData): SagaIterator {
  try {
    const response = yield call(saveUnSecuredDetailedScreeningDataApi, {
      student_id,
      academic_scores_10th,
      academic_scores_12th,
      academic_scores_ug,
      marital_status,
      age,
      program_type,
      country,
      rank,
      loan_amount_required,
      any_existing_loans,
      any_history_of_defaults,
      do_you_know_current_cibil,
      current_cibil,
      relationship_with_student,
      coapplicant_place,
      pan_and_aadhar_available,
      professional_background,
      salary_range,
      proof_of_income,
      know_cibil_score,
      father_cibil,
      any_loan_exisiting,
      history_of_defaults,
      current_cibil_score,
    });

    const data = response.data.message;
    console.log("res data---->", data);

    yield put(studentDetailsApiResponseSuccess(StudentDetailsActionTypes.SAVE_UN_SECURED_DETAILS, data));
    //calling get method after successfull api creation
    // yield put(getComment(student_id));
  } catch (error: any) {
    yield put(studentDetailsApiResponseError(StudentDetailsActionTypes.SAVE_UN_SECURED_DETAILS, error));
  }
}

export function* watchSavePreliminaryDetails() {
  yield takeEvery(StudentDetailsActionTypes.SAVE_PRELIMINARY_DETAILS, savePreliminaryDetails);
}

export function* watchSaveSecuredDetailedScreeningData() {
  yield takeEvery(StudentDetailsActionTypes.SAVE_SECURED_DETAILS, saveSecuredDetailedScreeningData);
}

export function* watchSaveUnSecuredDetailedScreeningData() {
  yield takeEvery(StudentDetailsActionTypes.SAVE_UN_SECURED_DETAILS, saveUnSecuredDetailedScreeningData);
}

function* studentDetailsSaga() {
  yield all([fork(watchSavePreliminaryDetails), fork(watchSaveSecuredDetailedScreeningData), fork(watchSaveUnSecuredDetailedScreeningData)]);
}

export default studentDetailsSaga;
