import { Router } from "express";
import multer from "multer";
import { setToOcr } from "../controllers/ocr_controller.js";
import { verifyAuth } from "../Middleware/auth.js";
const upload = multer({ dest: "uploads/" });
const router = Router();

router.post("/ocr", verifyAuth, upload.single("image"), setToOcr);

export default router;
