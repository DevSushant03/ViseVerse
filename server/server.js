// server.js
import express from "express";
import cors from "cors";
import api from "./api.js";
import PDFDocument from "pdfkit";
import fs from "fs/promises";
import multer from "multer";
import Tesseract from "tesseract.js";
import { Document, Packer, Paragraph, TextRun } from "docx";
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors({ origin: "*" }));
app.options("/aiResponse", cors());
app.options("/downloadPdf", cors());
app.options("/ocr", cors());

app.use(express.json());
const upload = multer({ dest: "uploads/" });

app.post("/aiResponse", async (req, res) => {
  try {
    const { text, action } = req.body;
    if (!text || !action) {
      return res
        .status(400)
        .json({ success: false, error: "Missing text or action" });
    }

    const response = await api(text, action);
    return res.json({ success: true, data: response });
  } catch (err) {
    console.error("aiResponse error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

app.post("/downloadPdf", (req, res) => {
  const { rawText } = req.body;
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=SnapGuruResult.pdf"
  );

  const doc = new PDFDocument();
  doc.pipe(res);
  doc.fontSize(14).text(rawText, {
    align: "left",
    lineGap: 4,
  });
  doc.end();
});
app.post("/downloadDocx", (req, res) => {
  const { rawText } = req.body;
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=SnapGuruResult.docx"
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun(rawText)],
          }),
        ],
      },
    ],
  });

  const buffer = Packer.toBuffer(doc);

  res.send(buffer);
});

app.post("/ocr", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    // Run OCR
    const {
      data: { text },
    } = await Tesseract.recognize(
      req.file.path,
      "eng" // language
    );
    await fs.unlink(req.file.path); // delete after OCR
    console.log(text);

    res.json({ success: true, ocrtext: text });
  } catch (error) {
    console.error("OCR error:", error);
    res.status(500).json({ error: "Failed to process image" });
  }
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
