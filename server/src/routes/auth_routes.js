import { Router } from "express";
import {
  deleteAccount,
  login,
  logout,
  register,
  resetPassword,
  sendResetotp,
  sendVerifyOtp,
  verifyEmail,
  verifyOtp,
} from "../controllers/auth_controller.js";
import { verifyAuth } from "../Middleware/auth.js";
const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", verifyAuth, logout);
router.post("/deleteAccount", verifyAuth, deleteAccount);
//! Email verification
router.post("/sendVerifyOtp", verifyAuth, sendVerifyOtp);
router.post("/verifyEmail", verifyAuth, verifyEmail);
//! Reset password 
router.post("/sendResetOtp", sendResetotp);
router.post("/verifyOtp", verifyOtp);
router.post("/resetPassword", resetPassword);

export default router;
