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
}) {
  const baseUrl = "/create_student";

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
  }
) {
  const baseUrl = "/update_student";
  return api.create(`${baseUrl}?id=${student_id}`, params);
}

function getStudent() {
  const baseUrl = "/get_all_students/";
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

export { createStudent, deleteStudent, getStudent, getStudentById, updateStudent };
