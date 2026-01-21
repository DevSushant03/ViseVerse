import Tesseract from "tesseract.js";
import fs from "fs/promises";

export const extractText = async (path) => {
  const {
    data: { text },
  } = await Tesseract.recognize(
    path,
    "eng", // language
  );
  await fs.unlink(path); // delete after OCR

  return text;
};
