// middleware/auth.js
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function verifyAuth(req, res, next) {
  const token = req.cookies.accessToken;
  
  if (!token) {
    console.log("token", token);
    return res.json({success:false,message:"User not login !"});
    
  }

  try {
    req.user = token;
    next();
  } catch (err) {
    console.log("auth",err);
    
  }
}
