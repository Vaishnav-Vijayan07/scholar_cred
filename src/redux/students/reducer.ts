// apicore
import { showSuccessAlert, showWarningAlert } from "../../constants/alerts";

// constants
import { StudentActionTypes } from "./constants";

const INIT_STATE = {
  students: [],
  deletedStudents: [],
  studentById: null,
  loading: false,
  initialLoading: false,
  error: null,
};

interface StudentData {
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  country_of_origin: string;
  application_status: string;
  source: string;
}

interface studentActionType {
  type:
    | StudentActionTypes.API_RESPONSE_SUCCESS
    | StudentActionTypes.API_RESPONSE_ERROR
    | StudentActionTypes.CREATE_STUDENT
    | StudentActionTypes.EDIT_STUDENT
    | StudentActionTypes.DELETE_STUDENT
    | StudentActionTypes.PERMANENT_DELETE_STUDENT
    | StudentActionTypes.GET_STUDENT
    | StudentActionTypes.GET_DELETED_STUDENT
    | StudentActionTypes.GET_STUDENT_BY_STAFF
    | StudentActionTypes.GET_ASSIGNED_STUDENT
    | StudentActionTypes.GET_STUDENT_BY_CREATED
    | StudentActionTypes.GET_STUDENT_BY_ID
    | StudentActionTypes.GET_STUDENT_BY_CONSULTANT;
  payload: {
    actionType?: string;
    data?: StudentData | {};
    message?: string;
    error?: string;
  };
}

interface State {
  student?: StudentData | [];
  deletedStudent?: StudentData | [];
  studentById?: StudentData | {} | null;
  loading?: boolean;
  value?: boolean;
}

const Students = (
  state: State = INIT_STATE,
  action: studentActionType
): any => {
  switch (action.type) {
    case StudentActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case StudentActionTypes.CREATE_STUDENT: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }

        case StudentActionTypes.EDIT_STUDENT: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }

        case StudentActionTypes.APPROVE_STUDENT: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }
        case StudentActionTypes.GET_STUDENT_BY_ID: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            studentById: action.payload.data,
          };
        }
        case StudentActionTypes.GET_STUDENT_BY_CONSULTANT: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            students: action.payload.data,
          };
        }
        case StudentActionTypes.GET_STUDENT: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            students: action.payload.data,
          };
        }
        case StudentActionTypes.GET_DELETED_STUDENT: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            deletedStudents: action.payload.data,
          };
        }
        case StudentActionTypes.GET_ASSIGNED_STUDENT: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            students: action.payload.data,
          };
        }
        case StudentActionTypes.GET_STUDENT_BY_CREATED: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            students: action.payload.data,
          };
        }
        case StudentActionTypes.GET_STUDENT_BY_STAFF: {
          return {
            ...state,
            loading: false,
            initialLoading: false,
            students: action.payload.data,
          };
        }
        case StudentActionTypes.DELETE_STUDENT: {
          showSuccessAlert(action.payload.data);
          return {
            ...state,
            loading: false,
            error: null,
          };
        }

        case StudentActionTypes.PERMANENT_DELETE_STUDENT: {
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

    case StudentActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case StudentActionTypes.CREATE_STUDENT: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }

        case StudentActionTypes.EDIT_STUDENT: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
          };
        }

        case StudentActionTypes.APPROVE_STUDENT: {
          showWarningAlert(action.payload.error);
          return {
            ...state,
            loading: false,
            error: action.payload.error,
          };
        }

        case StudentActionTypes.GET_STUDENT: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
            students: [],
          };
        }
        case StudentActionTypes.GET_DELETED_STUDENT: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
            students: [],
            deletedStudents: [],
          };
        }

        case StudentActionTypes.GET_ASSIGNED_STUDENT: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
            students: [],
          };
        }
        case StudentActionTypes.GET_STUDENT_BY_CREATED: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
            students: [],
          };
        }
        case StudentActionTypes.GET_STUDENT_BY_STAFF: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
            students: [],
          };
        }

        case StudentActionTypes.GET_STUDENT_BY_ID: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            studentById: [],
          };
        }

        case StudentActionTypes.GET_STUDENT_BY_CONSULTANT: {
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            students: [],
            initialLoading: false,
          };
        }

        case StudentActionTypes.PERMANENT_DELETE_STUDENT: {
          showWarningAlert(action.payload.error);
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            initialLoading: false,
          };
        }

        default:
          return { ...state };
      }

    case StudentActionTypes.CREATE_STUDENT:
      return { ...state, loading: true };

    case StudentActionTypes.EDIT_STUDENT:
      return { ...state, loading: true };

    case StudentActionTypes.GET_STUDENT:
      return { ...state, loading: true, initialLoading: true };

    case StudentActionTypes.GET_DELETED_STUDENT:
      return { ...state, loading: true, initialLoading: true };

    case StudentActionTypes.GET_STUDENT_BY_STAFF:
      return { ...state, loading: true, initialLoading: true };

    case StudentActionTypes.GET_STUDENT_BY_CREATED:
      return { ...state, loading: true, initialLoading: true };

    case StudentActionTypes.GET_STUDENT_BY_ID:
      return { ...state, loading: true, initialLoading: true };

    case StudentActionTypes.GET_ASSIGNED_STUDENT:
      return { ...state, loading: true, initialLoading: true };

    case StudentActionTypes.GET_STUDENT_BY_CONSULTANT:
      return { ...state, loading: true, initialLoading: true };

    case StudentActionTypes.DELETE_STUDENT:
      return { ...state, loading: true, initialLoading: true };

    case StudentActionTypes.PERMANENT_DELETE_STUDENT:
      return { ...state, loading: true };

    default:
      return { ...state };
  }
};
export default Students;
