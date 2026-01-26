import userModel from "../models/user_model.js";
import { resetTokensIfNeeded } from "../services/ai_services.js";

export const getUserData = async (req, res) => {
  try {
    const { userid } = req.user;
    const user = await userModel.findById(userid).select("-password");
    await resetTokensIfNeeded(user);
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
