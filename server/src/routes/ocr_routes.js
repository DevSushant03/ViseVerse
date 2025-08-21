import { Router } from "express";
import multer from "multer";
import { setToOcr } from "../controllers/ocr_controller.js";
const upload = multer({ dest: "uploads/" });
const router = Router();

router.post("/ocr",upload.single("image"), setToOcr);

export default router;
