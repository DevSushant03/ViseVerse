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

    return res.json({ success: true });
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
  const { userid } = req.user;
  try {
    const user = await userModel.findByIdAndDelete(userid);
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logout successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userid } = req.user;

    const user = await userModel.findById(userid);
    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Accout already verified " });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 10000;
    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "ViseVerse Email Verification OTP",
      text: `Your OTP is ${otp}. Verify your accouut using this OTP`,
    };
    await transporter.sendMail(mailOption);
    return res.json({
      success: true,
      message: "Verification OTP send on mail",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { verificationCode } = req.body;
  const { userid } = req.user;

  console.log(verificationCode,userid);
  

  if (!userid || !verificationCode) {
    console.log("Missing Details");

    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findById(userid);
    if (!user) {
      console.log("User Not Found");

      return res.json({ success: false, message: "User Not Found" });
    }
    if (user.verifyOtp === "" || user.verifyOtp !== verificationCode) {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      console.log("Otp is expired");
      return res.json({ success: false, message: "Otp is expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    user.save();
    console.log("Account verified successfully");
    return res.json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (error) {
    console.log(error);

    return res.json({ success: false, message: error.message });
  }
};
