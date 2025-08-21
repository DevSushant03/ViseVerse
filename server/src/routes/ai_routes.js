import { Router } from "express";
import { aiResponse } from "../controllers/ai_controller.js";

const router = Router();
router.post("/aiResponse", aiResponse);

export default router;
