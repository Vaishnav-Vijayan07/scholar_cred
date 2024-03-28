import { APICore } from "./apiCore";

const api = new APICore();

// account
function savePreliminaryDetails(params: {
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
}) {
  const baseUrl = "/savePreliminaryDetails";

  return api.create(`${baseUrl}`, params);
}

function checkLoanType(params: { student_id: string }) {
  const baseUrl = "/checkLoanType";

  return api.create(`${baseUrl}`, params);
}

function saveLoanType(params: { student_id: string; loan_type: string }) {
  const baseUrl = "/saveLoanTypeAdmin";

  return api.create(`${baseUrl}`, params);
}

function saveSecuredDetailedScreeningData(params: {
  student_id: string;
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
  rc_house: string;
  four_wheel_entry: string;
  nilam_or_purayidam: string;
  bought_within_last_3_years: string;
  existing_housing_loan: string;
  bank_name: string;
  total_land_area: string;
  boundary_wall_area: string;
  four_wheel_entry_land_only: string;
  property_registration_type: string;
  any_agricultural_activities: string;
  bought_within_last_3_years_land_only: string;
  value_of_the_property: string;
  value_of_fd: string;
  gold_weight: string;
  gov_bonds: string;
}) {
  const baseUrl = "/saveSecuredDetailedScreeningData";

  return api.create(`${baseUrl}`, params);
}

function saveUnSecuredDetailedScreeningData(params: {
  student_id: string;
  academic_scores_10th: string;
  academic_scores_12th: string;
  academic_scores_ug: string;
  marital_status: string;
  age: string;
  program_type: string;
  country: string;
  rank: string;
  loan_amount_required: string;
  any_existing_loans: string;
  any_history_of_defaults: string;
  do_you_know_current_cibil: string;
  current_cibil: string;
  relationship_with_student: string;
  coapplicant_place: string;
  pan_and_aadhar_available: string;
  professional_background: string;
  salary_range: string;
  proof_of_income: string;
  know_cibil_score: string;
  father_cibil: string;
  any_loan_exisiting: string;
  history_of_defaults: string;
  current_cibil_score: string;
}) {
  const baseUrl = "/saveUnSecuredDetailedScreeningData";

  return api.create(`${baseUrl}`, params);
}

export { savePreliminaryDetails, saveSecuredDetailedScreeningData, saveUnSecuredDetailedScreeningData, checkLoanType, saveLoanType };
