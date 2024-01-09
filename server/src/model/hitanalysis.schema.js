import mongoose from "mongoose";
const hitAnalysisSchema = mongoose.Schema(
  {
    url: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "urls",
      required: true,
    },
    hit_date: {
      type: String,
      required: true,
    },
    day_wise_hit_count: {
      type: Number,
      required: true,
    },
    link_gen_date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Analysis = mongoose.model("daywiseanalysis", hitAnalysisSchema);
export default Analysis;
