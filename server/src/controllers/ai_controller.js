import { processText } from "../services/ai_services.js";

export const aiResponse = async (req, res, next) => {
  try {
    const { text, action } = req.body || {};
    if (!text || !action)
      return res.json({ message: "Missing text or action" });
    const data = await processText(text, action);
    return res.json({ data, success: true });
  } catch (err) {
    console.log("ai controller:", err.message);
    next(err);
  }
};
