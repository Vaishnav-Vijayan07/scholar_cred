// constants
import { StudentDetailsActionTypes } from "./constants";

export interface StudentDetailsActionType {
  type:
    | StudentDetailsActionTypes.API_RESPONSE_SUCCESS
    | StudentDetailsActionTypes.API_RESPONSE_ERROR
    | StudentDetailsActionTypes.SAVE_PRELIMINARY_DETAILS
    | StudentDetailsActionTypes.SAVE_SECURED_DETAILS;
  payload: {} | string;
}
interface CommentData {
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
}

// Common success
export const studentDetailsApiResponseSuccess = (actionType: string, data: CommentData | {}): StudentDetailsActionType => ({
  type: StudentDetailsActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

// Common error
export const studentDetailsApiResponseError = (actionType: string, error: string): StudentDetailsActionType => ({
  type: StudentDetailsActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const savePreliminaryDetails = (
  student_id: string,
  name: string,
  email: string,
  whatsapp_number: string,
  destination_country: string,
  application_status: string,
  program_type: string,
  university_details: string,
  primary_applicant: string,
  type_of_profession: string,
  salary_range: string,
  collateral_item: string,
  remark: string
): StudentDetailsActionType => ({
  type: StudentDetailsActionTypes.SAVE_PRELIMINARY_DETAILS,
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
});

export const saveSecuredDetailedScreeningData = (
  student_id: string,
  scored_below_60: string,
  univerist_rank: string,
  program_types: string,
  any_existing_ongoing_loans: string,
  any_history_of_know_defaults: string,
  know_the_current_cibil: string,
  cibil: string,
  realtionship_with_student: string,
  place_of_residence: string,
  pan_and_aadhar_available: string,
  professional_background: string,
  salaryrange: string,
  proof_of_income: string,
  know_the_current_cibil_co_applicant: string,
  cibil_co_applicant: string
): StudentDetailsActionType => ({
  type: StudentDetailsActionTypes.SAVE_SECURED_DETAILS,
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
});
