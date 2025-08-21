import { Router } from "express";
import { downloadDocx, downloadPdf } from "../controllers/file_controller.js";
const router = Router();

router.post("/downloadPdf", downloadPdf);
router.post("/downloadDocx", downloadDocx);

export default router;
