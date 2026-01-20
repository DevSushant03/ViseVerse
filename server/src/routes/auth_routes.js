import { Router } from "express";
import {
  deleteAccount,
  login,
  logout,
  register,
  resetPassword,
  sendEmailVerificationOtp,
  sendResetotp,
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
router.post("/sendEmailVerificationOtp", sendEmailVerificationOtp);
router.post("/verifyEmail",  verifyEmail);
//! Reset password 
router.post("/sendResetOtp", sendResetotp);
router.post("/verifyOtp", verifyOtp);
router.post("/resetPassword", resetPassword);

export default router;
