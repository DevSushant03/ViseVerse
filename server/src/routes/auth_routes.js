import { Router } from "express";
import {
  deleteAccount,
  login,
  logout,
  refreshAccessToken,
  register,
  resetPassword,
  sendEmailVerificationOtp,
  sendResetotp,
  verifyOtp,
} from "../controllers/auth_controller.js";
import { verifyAuth } from "../Middleware/auth.js";
import passport from "passport";
import { initiateGoogle, googleCallback } from "../controllers/oauth_controller.js";
import { linkProvider } from "../controllers/oauth_controller.js";
const router = Router();

// Start Google OAuth (optionally add ?link=1 to signal linking intent)
router.get("/auth/google", initiateGoogle);

// Callback route used by Google OAuth
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  googleCallback,
);

// Link an OAuth provider to the logged-in account
router.post("/auth/link-provider", verifyAuth, linkProvider);
router.post("/login", login);
router.post("/register", register);
router.post("/refreshToken", refreshAccessToken);
router.post("/logout", verifyAuth, logout);
router.post("/deleteAccount", verifyAuth, deleteAccount);
//! Email verification
router.post("/sendEmailVerificationOtp", sendEmailVerificationOtp);
//! Reset password 
router.post("/sendResetOtp", sendResetotp);
router.post("/verifyOtp", verifyOtp);
router.post("/resetPassword", resetPassword);

export default router;
