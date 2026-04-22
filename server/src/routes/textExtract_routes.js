import { Router } from "express";
import multer from "multer";
import {
  handleExtractTextFromDocs,
  handleExtractTextFromImg,
  handleExtractTextFromPdf,
} from "../controllers/textExtract_controller.js";
import { verifyAuth } from "../Middleware/auth.js";
const upload = multer({ dest: "uploads/" });
const router = Router();

router.post(
  "/image",
  verifyAuth,
  upload.single("image"),
  handleExtractTextFromImg,
);
router.post("/pdf", verifyAuth, upload.single("pdf"), handleExtractTextFromPdf);
router.post(
  "/docs",
  verifyAuth,
  upload.single("docs"),
  handleExtractTextFromDocs,
);

export default router;
