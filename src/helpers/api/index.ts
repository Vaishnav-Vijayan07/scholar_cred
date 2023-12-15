import { login, logout, signup, forgotPassword, changePassword } from "./auth";
import { createConsultant, updateConsultant, getConsultants, getConsultantsById, deleteConsultant } from "./consultant";

import { createAdminUsers, editAdminUsers, getCredAdminUsers, getAdminUsersById, deleteAdminUsers, resetPassword, fileUpload } from "./admin_users";
import { createAdminStaff, deleteAdminStaff, getAdminStaff, getAdminStaffById, updateAdminStaff } from "./admin_staffs";
import { createConsultantStaff, deleteConsultantStaff, getConsultantStaff, getConsultantStaffById, updateConsultantStaff } from "./consultantStaff";
import { createConsultantAdmin, deleteConsultantAdmin, getConsultantAdmin, getConsultantAdminById, updateConsultantAdmin } from "./consultantAdmin";

import { getUserTypes } from "./user_types";
import { createStudent, deleteStudent, getStudent, getStudentById, updateStudent, getStudentByStaff } from "./students";

export {
  login,
  logout,
  signup,
  changePassword,
  forgotPassword,
  createConsultant,
  updateConsultant,
  getConsultants,
  getConsultantsById,
  deleteConsultant,
  createAdminUsers,
  editAdminUsers,
  getCredAdminUsers,
  getAdminUsersById,
  deleteAdminUsers,
  getUserTypes,
  createAdminStaff,
  deleteAdminStaff,
  getAdminStaff,
  getAdminStaffById,
  updateAdminStaff,
  createConsultantAdmin,
  deleteConsultantAdmin,
  getConsultantAdmin,
  getConsultantAdminById,
  updateConsultantAdmin,
  createStudent,
  deleteStudent,
  getStudent,
  getStudentById,
  updateStudent,
  resetPassword,
  createConsultantStaff,
  deleteConsultantStaff,
  getConsultantStaff,
  getConsultantStaffById,
  updateConsultantStaff,
  fileUpload,
  getStudentByStaff,
};
