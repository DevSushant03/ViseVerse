import {
  extractTextFromDocs,
  extractTextFromImg,
  extractTextFromPdf,
} from "../services/textExtract_services.js";

export const handleExtractTextFromImg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    const text = await extractTextFromImg(req.file.path);

    return res.json({ success: true, text });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const handleExtractTextFromPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No pdf file uploaded" });
    }

    const text = await extractTextFromPdf(req.file.path);

    console.log(text);
    
    return res.json({ success: true, text });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const handleExtractTextFromDocs = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No Docs file uploaded" });
    }

    const text = await extractTextFromDocs(req.file.path);

    return res.json({ success: true, text });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
