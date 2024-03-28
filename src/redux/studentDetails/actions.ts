// constants
import { StudentDetailsActionTypes } from "./constants";

export interface StudentDetailsActionType {
  type:
    | StudentDetailsActionTypes.API_RESPONSE_SUCCESS
    | StudentDetailsActionTypes.API_RESPONSE_ERROR
    | StudentDetailsActionTypes.SAVE_PRELIMINARY_DETAILS
    | StudentDetailsActionTypes.SAVE_UN_SECURED_DETAILS
    | StudentDetailsActionTypes.CHECK_LOAN_TYPE
    | StudentDetailsActionTypes.SAVE_LOAN_TYPE
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
  cibil_co_applicant: string,
  rc_house: string,
  four_wheel_entry: string,
  nilam_or_purayidam: string,
  bought_within_last_3_years: string,
  existing_housing_loan: string,
  bank_name: string,
  total_land_area: string,
  boundary_wall_area: string,
  four_wheel_entry_land_only: string,
  property_registration_type: string,
  any_agricultural_activities: string,
  bought_within_last_3_years_land_only: string,
  value_of_the_property: string,
  value_of_fd: string,
  gold_weight: string,
  gov_bonds: string
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
    rc_house,
    four_wheel_entry,
    nilam_or_purayidam,
    bought_within_last_3_years,
    existing_housing_loan,
    bank_name,
    total_land_area,
    boundary_wall_area,
    four_wheel_entry_land_only,
    property_registration_type,
    any_agricultural_activities,
    bought_within_last_3_years_land_only,
    value_of_the_property,
    value_of_fd,
    gold_weight,
    gov_bonds,
  },
});

export const saveUnSecuredDetailedScreeningData = (
  student_id: string,
  academic_scores_10th: string,
  academic_scores_12th: string,
  academic_scores_ug: string,
  marital_status: string,
  age: string,
  program_type: string,
  country: string,
  rank: string,
  loan_amount_required: string,
  any_existing_loans: string,
  any_history_of_defaults: string,
  do_you_know_current_cibil: string,
  current_cibil: string,
  relationship_with_student: string,
  coapplicant_place: string,
  pan_and_aadhar_available: string,
  professional_background: string,
  salary_range: string,
  proof_of_income: string,
  know_cibil_score: string,
  father_cibil: string,
  any_loan_exisiting: string,
  history_of_defaults: string,
  current_cibil_score: string
): StudentDetailsActionType => ({
  type: StudentDetailsActionTypes.SAVE_UN_SECURED_DETAILS,
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
});

export const checkLoanType = (student_id: string): StudentDetailsActionType => ({
  type: StudentDetailsActionTypes.CHECK_LOAN_TYPE,
  payload: {
    student_id,
  },
});

export const saveLoanType = (student_id: string, loan_type: string): StudentDetailsActionType => ({
  type: StudentDetailsActionTypes.SAVE_LOAN_TYPE,
  payload: {
    student_id,
    loan_type,
  },
});

export const clearLoanTypeState = () => ({
  type: StudentDetailsActionTypes.CLEAR_LOAN_TYPE_STATE,
  payload: {},
});
