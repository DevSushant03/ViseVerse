import { createPdf, createDocx } from "../services/file_services.js";

export const downloadPdf = async (req, res) => {

  try {
    const {rawText} = req.body;
  
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=SnapGuruResult.pdf"
  );
  createPdf(res, rawText);
  } catch (error) {
    console.log("file controller"+error);
    
  }
 
};

export const downloadDocx = async (req, res) => {
  const {rawText}  = req.body;
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
