import mongoose from "mongoose";
const urlSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    orig_url: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    hit_ratio: {
      type: Number,
      default: 0,
      required: true,
    },
    short_url: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
const URL = mongoose.model("urls", urlSchema);
export default URL;
