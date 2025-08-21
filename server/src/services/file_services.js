import { Document, Packer, Paragraph, TextRun } from "docx";
import PDFDocument from "pdfkit";

export const createPdf = (res, rawText) => {
  const doc = new PDFDocument();
  doc.pipe(res);
  doc.fontSize(14).text(rawText, {
    align: "left",
    lineGap: 4,
  });
  doc.end();
};
export const createDocx = async (rawText) => {
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
  const buffer = await Packer.toBuffer(doc);
  return buffer;
};
