import { extractText } from "../services/ocr_services.js";

export const setToOcr = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    const text = await extractText(req.file.path);

    return res.json({ success: true, ocrtext: text });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
