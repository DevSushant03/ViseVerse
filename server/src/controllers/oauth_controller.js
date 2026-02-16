import passport from "passport";
import jwt from "jsonwebtoken";
import { createSessionForUser } from "../services/oauth_service.js";
import crypto from "crypto";
import googleConfig from "../config/google_oauth.js";

// Initiate Google OAuth
export const initiateGoogle = (req, res, next) => {
  // Optionally frontend can pass a `link` query param when user explicitly links accounts
  // Ensure we pass the exact callback URL so Google receives the same redirect_uri
  const options = {
    scope: ["profile", "email"],
    session: false,
    callbackURL: googleConfig.callbackURL,
  };
  if (req.query.link === "1") {
    // mark linking intent so passport callback can detect
    req.query.link = "1";
  }
  passport.authenticate("google", options)(req, res, next);
};

// Callback handler — creates session tokens or redirects to linking UI
export const googleCallback = async (req, res, next) => {
  try {
    // passport strategy attaches user and optional linking info on req
    const user = req.user;
  

    // Normal login via Google — create cookies and session
    await createSessionForUser(jwt, user, res, req);

    // Redirect to app
    const frontendUrl = process.env.FRONTEND_URL;
    return res.redirect(`${frontendUrl}`);
  } catch (err) {
    return next(err);
  }
};

// Endpoint for authenticated users to link a provider to their account
export const linkProvider = async (req, res) => {
  try {
    const { provider, providerId, email } = req.body;
    const { userid } = req.user || {};
    if (!provider || !providerId) {
      return res.status(400).json({ success: false, message: "Missing provider data" });
    }

    // Ensure the requester owns the account or email matches
    if (!userid) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const userModel = (await import("../models/user_model.js")).default;
    const user = await userModel.findById(userid);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Prevent linking a provider that is already attached to another account
    const existing = await userModel.findOne({ "providers.providerId": providerId, "providers.name": provider });
    if (existing && existing._id.toString() !== userid) {
      return res.status(409).json({ success: false, message: "Provider already linked to another account" });
    }

    user.providers = user.providers || [];
    if (!user.providers.some((p) => p.name === provider && p.providerId === providerId)) {
      user.providers.push({ name: provider, providerId });
    }

    if (provider === "google") {
      user.googleId = providerId;
      user.provider = user.provider === "local" ? "local" : "google";
    }

    await user.save();

    return res.json({ success: true, message: "Provider linked" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
