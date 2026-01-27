import userModel from "../models/user_model.js";
import { processText, resetTokensIfNeeded } from "../services/ai_services.js";

const estimateTokens = (text) => {
  return Math.ceil(text.length / 4);
};


export const aiResponse = async (req, res, next) => {
  let isCancelled = false;

  const abortController = new AbortController();

  req.on("aborted", () => {
    isCancelled = true;
    abortController.abort(); // 👈 THIS STOPS AI REQUEST
    console.log("❌ Client cancelled → AI request aborted");
  });
  try {
    const { text, action } = req.body || {};

    if (!text || !action) {
      return res.status(400).json({
        success: false,
        message: "Missing text or action",
      });
    }
    const user = await userModel.findById(req.user.userid).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised",
      });
    }

    await resetTokensIfNeeded(user);

    if (user.tokens <= 0) {
      return res.status(403).json({
        success: false,
        message: "No tokens left. Please upgrade your plan.",
      });
    }

    const estimatedTokens = estimateTokens(text);

    if (user.tokens < estimatedTokens) {
      return res.status(403).json({
        success: false,
        message: "Not enough tokens. Please recharge.",
      });
    }

    const data = await processText(text, action,abortController.signal);

    if (isCancelled || req.aborted) {
      console.log("⚠️ Request cancelled → skipping save & token deduction");
      return;
    }

    user.tokens -= estimatedTokens;
    user.tokensUsed += estimatedTokens;
    await user.save();

    return res.json({
      success: true,
      data,
      user,
    });
  } catch (err) {
    console.log("ai controller:", err.message);
    next(err);
  }
};
