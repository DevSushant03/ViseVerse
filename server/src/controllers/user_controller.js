import userModel from "../models/user_model.js";

export const getUserData = async (req, res) => {
  try {
    const { userid } = req.user;
    const user = await userModel.findById(userid);

    return res.json({ success: true, message: user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
