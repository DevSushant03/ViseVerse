const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // Use full callback URL in production (e.g. https://yourdomain.com/auth/google/callback)
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback",
  scope: ["profile", "email"],
};

export default googleConfig;
