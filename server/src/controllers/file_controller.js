import { createPdf, createDocx } from "../services/file_services.js";

export const downloadPdf = async (res, req) => {
  const { rawText } = req.body;
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=SnapGuruResult.pdf"
  );
  createPdf(res, rawText);
};

export const downloadDocx = async (res, req) => {
  const { rawText } = req.body;
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=SnapGuruResult.docx"
  );

  const buffer = await createDocx(rawText);

  res.send(buffer);
};
