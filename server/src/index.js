
//index.js
import { Router } from "express";
import aiRoutes from "./routes/ai_routes.js";
import fileRoutes from "./routes/file_routes.js";
import authRoutes from "./routes/auth_routes.js";
import ocrRoutes from "./routes/ocr_routes.js";
import userRoutes from "./routes/user_routes.js"


const router = Router()


router.use("/", authRoutes);
router.use("/", aiRoutes);
router.use("/", fileRoutes);
router.use("/", ocrRoutes);
router.use("/", userRoutes)

export default router;