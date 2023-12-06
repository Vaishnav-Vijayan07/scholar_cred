import { login, logout, signup, forgotPassword } from "./auth";
import { createConsultant, updateConsultant, getConsultants, getConsultantsById, deleteConsultant } from "./consultant";

import { createAdminUsers, editAdminUsers, getAdminUsers, getAdminUsersById, deleteAdminUsers } from "./admin_users";
import { createAdminStaff, deleteAdminStaff, getAdminStaff, getAdminStaffById, updateAdminStaff } from "./admin_staffs";
import { createConsultantStaff, deleteConsultantStaff, getConsultantStaff, getConsultantStaffById, updateConsultantStaff } from "./consultantStaff";

import { getUserTypes } from "./user_types";
import { createStudent, deleteStudent, getStudent, getStudentById, updateStudent } from "./students";

export {
  login,
  logout,
  signup,
  forgotPassword,
  createConsultant,
  updateConsultant,
  getConsultants,
  getConsultantsById,
  deleteConsultant,
  createAdminUsers,
  editAdminUsers,
  getAdminUsers,
  getAdminUsersById,
  deleteAdminUsers,
  getUserTypes,
  createAdminStaff,
  deleteAdminStaff,
  getAdminStaff,
  getAdminStaffById,
  updateAdminStaff,
  createConsultantStaff,
  deleteConsultantStaff,
  getConsultantStaff,
  getConsultantStaffById,
  updateConsultantStaff,
  createStudent,
  deleteStudent,
  getStudent,
  getStudentById,
  updateStudent,
};
