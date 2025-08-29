import { Router } from "express";
import { aiResponse } from "../controllers/ai_controller.js";
import { verifyAuth } from "../Middleware/auth.js";

const router = Router();
router.post("/aiResponse",verifyAuth, aiResponse);

export default router;
