import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/user_model.js";
import googleConfig from "./google_oauth.js";
import { OldUserExist } from "../services/auth_services.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: googleConfig.clientID,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackURL,
      scope: googleConfig.scope,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        // Find existing user by email
        let user = await userModel.findOne({ email });

        if (user) {
          // If user already has a Google provider linked, ensure id matches
          const hasGoogle = user.providers?.some((p) => p.name === "google");

          if (hasGoogle) {
            return done(null, user);
          }

          // If the user has a local password, do NOT auto-link.
          // Redirect flow will instruct frontend to let user link accounts explicitly.
          if (user.password) {
            // attach info to request so the callback route can redirect accordingly
            req.linkAccount = true;
            req.linkEmail = email;
            req.linkProviderId = profile.id;
            return done(null, user);
          }

          // Otherwise safe to link (no local password set)
          user.googleId = profile.id;
          user.providers = user.providers || [];
          user.providers.push({ name: "google", providerId: profile.id });
          user.provider = "google";
          await user.save();
          return done(null, user);
        }

        const { tokens, lastTokenReset } = await OldUserExist(email);

        // Create new user because none exists with this email
        user = await userModel.create({
          name: profile.name?.givenName || "",
          surname: profile.name?.familyName || "",
          email,
          googleId: profile.id,
          providers: [{ name: "google", providerId: profile.id }],
          provider: "google",
          password: null,
          tokens,
          lastTokenReset,
        });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);
