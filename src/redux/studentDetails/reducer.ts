// apicore
import { showSuccessAlert } from "../../constants/alerts";

// constants
import { StudentDetailsActionTypes } from "./constants";

const INIT_STATE = {
  comments: [],
  loading: false,
  initialLoading: false,
};

interface StudentData {
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

interface StudentDetailsActionType {
  type:
    | StudentDetailsActionTypes.API_RESPONSE_SUCCESS
    | StudentDetailsActionTypes.API_RESPONSE_ERROR
    | StudentDetailsActionTypes.SAVE_PRELIMINARY_DETAILS
    | StudentDetailsActionTypes.SAVE_SECURED_DETAILS;
  payload: {
    actionType?: string;
    data?: StudentData | {};
    error?: string;
  };
}

interface State {
  consultant?: StudentData | {};
  loading?: boolean;
  value?: boolean;
}

const StudentDetailsReducer = (state: State = INIT_STATE, action: StudentDetailsActionType): any => {
  switch (action.type) {
    case StudentDetailsActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case StudentDetailsActionTypes.SAVE_PRELIMINARY_DETAILS: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }
        case StudentDetailsActionTypes.SAVE_SECURED_DETAILS: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }
        default:
          return { ...state };
      }

    case StudentDetailsActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case StudentDetailsActionTypes.SAVE_PRELIMINARY_DETAILS: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }

        case StudentDetailsActionTypes.SAVE_SECURED_DETAILS: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }

        default:
          return { ...state };
      }

    case StudentDetailsActionTypes.SAVE_PRELIMINARY_DETAILS:
      return { ...state, loading: true };

    case StudentDetailsActionTypes.SAVE_SECURED_DETAILS:
      return { ...state, loading: true };

    default:
      return { ...state };
  }
};
export default StudentDetailsReducer;
