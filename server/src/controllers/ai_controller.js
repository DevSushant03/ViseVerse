import { processText } from "../services/ai_services.js";

export const aiResponse = async (req, res, next) => {
  try {
    const { text, action } = req.body || {};
    if (!text || !action) return fail(res, 400, "Missing text or action");
    const data = await processText(text, action);
    return res.json({data});
  } catch (err) {
    console.log("ai controller:"+err);
    
    next(err);
  }
};
