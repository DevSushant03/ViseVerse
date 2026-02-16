// middleware/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function verifyAuth(req, res, next) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      errorType: "AUTH",
      message: "User not login !",
    });
  }

  try {
    const DecodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (DecodedToken.id) {
      req.user = { userid: DecodedToken.id };
      next();
    } else {
      return res.status(401).json({
        success: false,
        errorType: "AUTH",
        message: "Not authorized. Login again.",
      });
    }
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
}
