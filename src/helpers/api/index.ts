import { login, logout, signup, forgotPassword, changePassword } from "./auth";
import { createConsultant, updateConsultant, getConsultants, getConsultantsById, deleteConsultant } from "./consultant";

import { createAdminUsers, editAdminUsers, getCredAdminUsers, getAdminUsersById, deleteAdminUsers, resetPassword, fileUpload } from "./admin_users";
import { createAdminStaff, deleteAdminStaff, getAdminStaff, getAdminStaffById, updateAdminStaff } from "./admin_staffs";
import { createConsultantStaff, deleteConsultantStaff, getConsultantStaff, getConsultantStaffById, updateConsultantStaff } from "./consultantStaff";
import { createConsultantAdmin, deleteConsultantAdmin, getConsultantAdmin, getConsultantAdminById, updateConsultantAdmin } from "./consultantAdmin";
import { addStatus, deleteStatus, getAllStatus, updateStatus } from "./status";
import { createComment, deleteComment, getComments, updateComment } from "./comments";
import { addLoanStatus, deleteLoanStatus, getLoanStatus, updateLoanStatus } from "./loan_status";

import { getUserTypes } from "./user_types";
import {
  createStudent,
  getAssignedStudents,
  deleteStudent,
  getStudent,
  getStudentById,
  updateStudent,
  getStudentByStaff,
  getStudentByCreated,
  createStudentByCredStaff,
  getStudentByConsultant,
} from "./students";

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
  getStudentByCreated,
  createStudentByCredStaff,
  getAssignedStudents,
  addStatus,
  deleteStatus,
  getAllStatus,
  updateStatus,
  createComment,
  deleteComment,
  getComments,
  updateComment,
  addLoanStatus,
  deleteLoanStatus,
  getLoanStatus,
  updateLoanStatus,
  getStudentByConsultant,
};
