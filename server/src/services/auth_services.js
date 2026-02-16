import crypto from "crypto";
import { Session } from "../models/session_model.js";
import DeletedAccountModel from "../models/deletedAccount_model.js";
export const createAccessToken = (jwt, user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
  };

  // Allow optional explicit cookie domain configuration for production
  if (process.env.NODE_ENV === "production" && process.env.COOKIE_DOMAIN) {
    cookieOpts.domain = process.env.COOKIE_DOMAIN;
  }

  res.cookie("accessToken", token, cookieOpts);
};

export const createRefreshToken = async (jwt, user, res, req) => {
  const token = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  await Session.create({
    userId: user._id,
    tokenHash: crypto.createHash("sha256").update(token).digest("hex"),
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  if (process.env.NODE_ENV === "production" && process.env.COOKIE_DOMAIN) {
    cookieOpts.domain = process.env.COOKIE_DOMAIN;
  }

  res.cookie("refreshToken", token, cookieOpts);
};

export const getEmailOtpValidation = (res, user, verificationCode) => {
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
};

export const deleteAccessToken = (res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
};

export const setNewPassword = async (newPassword, bcrypt, user) => {
  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = newHashedPassword;
  user.resetOtp = "";
  user.resetOtpExpireAt = 0;
  user.save();
};

export const OldUserExist = async (email) => {
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

  return {tokens, lastTokenReset};
};
