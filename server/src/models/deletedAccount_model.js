import mongoose from "mongoose";

const deletedAccountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    tokensLeft: {
      type: Number,
      required: true,
    },

    lastTokenReset: {
      type: Date,
      required: true,
    },

    deletedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const DeletedAccountModel =
  mongoose.models.deletedaccount ||
  mongoose.model("deletedaccount", deletedAccountSchema);

export default DeletedAccountModel;
