import { login, logout, signup, forgotPassword } from "./auth";
import { createConsultant, updateConsultant, getConsultants, getConsultantsById, deleteConsultant } from "./consultant";

import { createAdminUsers, editAdminUsers, getAdminUsers, getAdminUsersById, deleteAdminUsers } from "./admin_users";
import { createAdminStaff, deleteAdminStaff, getAdminStaff, getAdminStaffById, updateAdminStaff } from "./admin_staffs";

import { getUserTypes } from "./user_types";

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
};
