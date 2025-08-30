import { Router } from "express";
import { login, logout, register, sendVerifyOtp, verifyEmail } from "../controllers/auth_controller.js";
import { verifyAuth } from "../Middleware/auth.js";
const router = Router()

router.post("/login",login)
router.post("/register",register)
router.post("/logout",verifyAuth,logout)
router.post("/sendVerifyOtp",verifyAuth,sendVerifyOtp)
router.post("/verifyEmail",verifyAuth,verifyEmail)

export default router;