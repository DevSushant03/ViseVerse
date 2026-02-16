import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      default: null,
    },

    // Backwards-compatible single-provider fields
    googleId: {
      type: String,
      default: null,
    },

    // Unified provider model for future multi-provider support
    providers: {
      type: [
        {
          name: { type: String, required: true }, // e.g. 'local', 'google'
          providerId: { type: String, default: null }, // e.g. google id
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    // Role-ready architecture: single role for now, can be extended to array
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    resetOtp: {
      type: String,
      default: "",
    },
    resetOtpExpireAt: {
      type: Number,
      default: 0,
    },

    tokens: {
      type: Number,
      default: 0,
    },

    tokensUsed: {
      type: Number,
      default: 0,
    },

    lastTokenReset: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
