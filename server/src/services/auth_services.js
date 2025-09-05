import bcrypt from "bcryptjs";

export const createAccessToken = (jwt, user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const welcomeEmailTemplate = (name) => ({
  subject: "Welcome to ViseVerse – Let’s Get Started!",
  text: `Hi ${name},

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
});

export const verificationEmailTemplate = ({ name, otp }) => ({
  subject: "Verify your ViseVerse account",
  text: `Hi ${name}, please verify your account using this OTP: ${otp}`,
});

export const resetOtpTemplate = ({ name, otp }) => ({
  subject: "Password Reset of ViseVerse account",
  text: `Hi ${name}, Reset your password using this OTP: ${otp}`,
});

export const sendWelcomeMail = async (res,email, subject, text, transporter) => {
  try {
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject,
      text,
    };
    await transporter.sendMail(mailOption);
  } catch (error) {
    return res.json({success:false,message:"Something is wrong !"})
  }
};

export const sendOtpMail = async ({ email, subject, text, transporter }) => {
  const mailOption = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject,
    text,
  };
  await transporter.sendMail(mailOption);
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
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
};

export const setNewPassword = async (newPassword, bcrypt, user) => {
  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = newHashedPassword;
  user.resetOtp = "";
  user.resetOtpExpireAt = 0;
  user.save();
};
