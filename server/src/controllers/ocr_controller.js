import { extractText } from "../services/ocr_services.js";

export const setToOcr = async (res, req) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file uploaded" });
  }

  const text = await extractText(req.file.path);

  res.json({ success: true, ocrtext: text });
};
