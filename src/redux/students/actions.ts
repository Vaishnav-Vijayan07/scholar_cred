// constants
import { StudentActionTypes } from "./constants";

export interface StudentActionType {
  type:
  | StudentActionTypes.API_RESPONSE_SUCCESS
  | StudentActionTypes.API_RESPONSE_ERROR
  | StudentActionTypes.DELETE_STUDENT
  | StudentActionTypes.EDIT_STUDENT
  | StudentActionTypes.APPROVE_STUDENT
  | StudentActionTypes.CREATE_STUDENT
  | StudentActionTypes.GET_STUDENT
  | StudentActionTypes.GET_STUDENT_BY_STAFF
  | StudentActionTypes.GET_STUDENT_BY_CREATED
  | StudentActionTypes.GET_ASSIGNED_STUDENT
  | StudentActionTypes.GET_STUDENT_BY_ID
  | StudentActionTypes.GET_STUDENT_BY_CONSULTANT;
  payload: {} | string;
}
interface StudentData {
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  // date_of_birth: string;
  // country_of_origin: string;
  application_status: string;
  source: string;
}

// Common success
export const studentApiResponseSuccess = (actionType: string, data: StudentData | {}): StudentActionType => ({
  type: StudentActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

// Common error
export const studentStaffApiResponseError = (actionType: string, error: string): StudentActionType => ({
  type: StudentActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

//create consultant;

export const createStudent = (
  first_name: string,
  last_name: string,
  email: string | null,
  phone: string,
  date_of_birth: string | undefined,
  // country_of_origin: string | undefined,
  // application_status: string | undefined,
  source: string,
  consultant_id: string
): StudentActionType => ({
  type: StudentActionTypes.CREATE_STUDENT,
  payload: {
    first_name,
    last_name,
    email,
    phone,
    date_of_birth,
    // country_of_origin,
    // application_status,
    source,
    consultant_id
  },
});

//edit consultant

export const editStudent = (
  student_id: string,
  first_name: string,
  last_name: string,
  email: string | null,
  phone: string,
  // date_of_birth: string | undefined,
  // country_of_origin: string | undefined,
  application_status: string | undefined,
  source: string
): StudentActionType => ({
  type: StudentActionTypes.EDIT_STUDENT,
  payload: {
    student_id,
    first_name,
    last_name,
    email,
    phone,
    // date_of_birth,
    // country_of_origin,
    application_status,
    source,
  },
});

//delete consultant

export const deleteStudent = (student_id: string,status?:any) => ({
  type: StudentActionTypes.DELETE_STUDENT,
  payload: { student_id,status },
});

export const getStudent = (status?: any): StudentActionType => ({
  type: StudentActionTypes.GET_STUDENT,
  payload: { status },
});

export const approveStudent = (student_id:any): StudentActionType => ({
  type: StudentActionTypes.APPROVE_STUDENT,
  payload: { student_id },
});


export const getStudentByStaff = (): StudentActionType => ({
  type: StudentActionTypes.GET_STUDENT_BY_STAFF,
  payload: {},
});

export const getStudentByCreated = (): StudentActionType => ({
  type: StudentActionTypes.GET_STUDENT_BY_CREATED,
  payload: {},
});

export const getAllAssignedStudents = (): StudentActionType => ({
  type: StudentActionTypes.GET_ASSIGNED_STUDENT,
  payload: {},
});

export const getStudentById = (student_id: string): StudentActionType => ({
  type: StudentActionTypes.GET_STUDENT_BY_ID,
  payload: { student_id },
});

export const getStudentByConsultant = (consultant_id: string): StudentActionType => ({
  type: StudentActionTypes.GET_STUDENT_BY_CONSULTANT,
  payload: { consultant_id },
});