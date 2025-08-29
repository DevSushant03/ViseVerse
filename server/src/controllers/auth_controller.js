import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user_model.js";
import transporter from "../config/nodemailer.js";
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name: username,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to ViseVerse – Let’s Get Started!",
      text: `Hi ${username},

Welcome to ViseVerse! 🎉
We’re thrilled to have you join us.

With ViseVerse, you’ll be able to:
✨ Capture what matters in seconds
✨ Extract insights with smart AI tools
✨ Simplify your workflow and save time

You’re all set to dive in—start exploring today:
👉 [Get Started with ViseVerse]

Have questions or feedback? Just hit reply—we’d love to hear from you and make ViseVerse even better.

Here’s to smarter, faster, and easier workflows. 🚀`,
    };
    await transporter.sendMail(mailOption);
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.clearCookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.json({ success: true, message: "Logout successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
