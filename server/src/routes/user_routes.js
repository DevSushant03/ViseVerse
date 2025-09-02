import { Router } from "express";
import { getUserData } from "../controllers/user_controller.js";
import { verifyAuth } from "../Middleware/auth.js";
const router = Router();

router.get("/userData",verifyAuth, getUserData);

export default router;
