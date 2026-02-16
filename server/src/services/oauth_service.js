import crypto from "crypto";
import { Session } from "../models/session_model.js";
import { createAccessToken, createRefreshToken } from "./auth_services.js";

export const createSessionForUser = async (jwt, user, res, req, accessExpiry = "15m", refreshExpiryDays = 7) => {
  // create access + refresh cookies using existing helpers
  createAccessToken(jwt, user, res);
  await createRefreshToken(jwt, user, res, req);

  // Session creation is handled inside createRefreshToken (it already stores tokenHash),
  // but we return a lightweight session info for caller convenience.
  return { success: true };
};

export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
