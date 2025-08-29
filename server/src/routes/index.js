
//index.js
import { Router } from "express";
import aiRoutes from "./ai_routes.js";
import fileRoutes from "./file_routes.js";
import authRoutes from "./auth_routes.js";
import ocrRoutes from "./ocr_routes.js";
import { verifyAuth } from "../Middleware/auth.js";

const router = Router()


router.use("/", authRoutes);
router.use("/", aiRoutes);
router.use("/", fileRoutes);
router.use("/", ocrRoutes);

export default router;