import Tesseract from "tesseract.js";
import fs from "fs/promises";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { log } from "console";

export const extractTextFromImg = async (path) => {
  const {
    data: { text },
  } = await Tesseract.recognize(
    path,
    "eng", // language
  );
  await fs.unlink(path);

  return text;
};

export const extractTextFromDocs = async (path) => {
  const result = await mammoth.extractRawText({ path });

  await fs.unlink(path);

  return result.value;
};
export const extractTextFromPdf = async (path) => {

  const buffer = await fs.readFile(path);
  const data = new Uint8Array(buffer); // ✅ FIX HERE

  const pdf = await pdfjsLib.getDocument({ data }).promise;

  let fullText = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();

    const strings = content.items.map((item) => item.str);
    fullText += strings.join(" ") + "\n";
  }

  await fs.unlink(path); // delete file after processing


  return fullText;
};
