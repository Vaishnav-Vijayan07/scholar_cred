import { APICore } from "./apiCore";

const api = new APICore();

// account
function createStudent(params: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  country_of_origin: string;
  application_status: string;
  source: string
}) {
  const baseUrl = "/create_student";

  return api.create(`${baseUrl}`, params);
}

function createStudentByCredStaff(params: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  country_of_origin: string;
  application_status: string;
  source: string
}) {
  const baseUrl = "/create_student_by_cred_staff";

  return api.create(`${baseUrl}`, params);
}

// account
function updateStudent(
  student_id: string,
  params: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    country_of_origin: string;
    application_status: string;
    source: string
  }
) {
  const baseUrl = "/update_student";
  return api.create(`${baseUrl}?id=${student_id}`, params);
}

function getStudent() {
  const baseUrl = "/get_all_students/";
  return api.get(`${baseUrl}`, {});
}

function getStudentByStaff() {
  const baseUrl = "/get_students_by_staff/";
  return api.get(`${baseUrl}`, {});
}

function getStudentByCreated() {
  const baseUrl = "/get_student_by_created_user/";
  return api.get(`${baseUrl}`, {});
}

function getAssignedStudents() {
  const baseUrl = "/get_all_assigned_students/";
  return api.get(`${baseUrl}`, {});
}

function deleteStudent(id: string) {
  const baseUrl = "/delete_student";
  return api.delete(`${baseUrl}?id=${id}`);
}

function getStudentById(student_id: string) {
  const baseUrl = "/get_student";
  return api.get(`${baseUrl}?id=${student_id}`, {});
}

export { createStudent, deleteStudent, getStudent, getStudentById, updateStudent, getStudentByStaff, getStudentByCreated, createStudentByCredStaff, getAssignedStudents };
