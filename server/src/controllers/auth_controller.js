import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user_model.js";
import {
  createAccessToken,
  deleteAccessToken,
  setNewPassword,
} from "../services/auth_services.js";
import DeletedAccountModel from "../models/deletedAccount_model.js";
import otpModel from "../models/OtpStorage.js";

//! Login functionality---------------------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please provide both email and password.",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message:
          "Email not recognized. Kindly check your input or create a new account.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    createAccessToken(jwt, user, res);

    res.json({
      success: true,
      user: {
        name: user.name,
        surname: user.surname,
        email: user.email,
        tokens: user.tokens,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//! Register functionality------------------------------------

export const register = async (req, res) => {
  try {
    const { name, surname, email, password, otp } = req.body;

    if (!name || !surname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing Details",
      });
    }

    const otpDoc = await otpModel.findOne({ email });

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found",
      });
    }

    // Check expiry
    if (otpDoc.expiresAt < new Date()) {
      await otpModel.deleteMany({ email });
      return res.status(400).json({
        success: false,
        message: "OTP expired. Please try again.",
      });
    }

    // Compare hashed OTP
    const isOtpValid = await bcrypt.compare(otp, otpDoc.otp);

    if (!isOtpValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Delete OTP after success
    await otpModel.deleteMany({ email });

    const hashedPassword = await bcrypt.hash(password, 10);

    let tokens = 500;
    let lastTokenReset = new Date();

    // 🔍 Check if user existed before
    const oldUser = await DeletedAccountModel.findOne({ email });

    if (oldUser) {
      const now = new Date();
      const hoursPassed = (now - oldUser.lastTokenReset) / (1000 * 60 * 60);

      if (hoursPassed < 24) {
        // ♻ Restore previous tokens
        tokens = oldUser.tokensLeft;
        lastTokenReset = oldUser.lastTokenReset;
      }
    }

    const user = new userModel({
      name,
      surname,
      email,
      password: hashedPassword,
      tokens,
      lastTokenReset,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Registered successfully",
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
//! logout functionality------------------------------------
export const logout = async (req, res) => {
  const { userid } = req.user;
  try {
    const user = await userModel.findById(userid);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    deleteAccessToken(res);
    return res.json({ success: true, message: "Logout successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//! Delete Account functionality-----------------------------------

export const deleteAccount = async (req, res) => {
  const { userid } = req.user;

  try {
    const user = await userModel.findById(userid);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    await DeletedAccountModel.findOneAndUpdate(
      { email: user.email },
      {
        email: user.email,
        tokensLeft: user.tokens,
        lastTokenReset: user.lastTokenReset,
        deletedAt: new Date(),
      },
      { upsert: true, new: true },
    );

    await userModel.findByIdAndDelete(userid);

    deleteAccessToken(res);

    return res.json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//! Send Otp functionality----------------------------------
export const sendEmailVerificationOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      return res.json({
        success: false,
        message:
          "An account with this email already exists. Please log in instead.",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const hashedOtp = await bcrypt.hash(otp, 10);

    await otpModel.deleteMany({ email });

    await otpModel.create({
      email,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    return res.json({
      success: true,
      otp, // for EmailJS
      email,
      message: "OTP generated",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Failed to generate OTP" });
  }
};


//! Reset password functionality---------------------------------
export const sendResetotp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    return res.json({
      success: true,
      otp,
      message: "Reset otp send on your registered email",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { otpString, email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (user.resetOtp === "" || user.resetOtp !== otpString) {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "Otp is expired" });
    }

    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    user.save();
    return res.json({
      success: true,
      message: "Otp verified successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { confirmPassword, email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    setNewPassword(confirmPassword, bcrypt, user);

    return res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
