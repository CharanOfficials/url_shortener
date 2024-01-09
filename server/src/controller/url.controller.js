import { generateDate } from "../generators/generateDate.js";
import { randomString } from "../generators/string.generator.js";
import Analysis from "../model/hitanalysis.schema.js";
import URL from "../model/url.schema.js";
export default class UrlController {
  async shortLink(req, res) {
    try {
      const { origUrl, validity } = req.body;
      if (!origUrl || !validity) {
        return res
          .status(422)
          .json({ success: false, message: "Invalid data." });
      } else {
        const short_url = randomString();
        const date = generateDate();
        const shortenUrl = await URL.create({
          orig_url: origUrl,
          expiresAt: Date.now() + validity * 60 * 60 * 1000,
          short_url: short_url,
          user: req.user,
        });
        await Analysis.create({
          url: shortenUrl._id,
          hit_date: date,
          day_wise_hit_count: 0,
          link_gen_date: date,
        });
        return res.status(200).json({
          success: true,
          message: "Generated successfully",
          url: shortenUrl,
        });
      }
    } catch (err) {
      console.log("Error occured while generating short url", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
  async redirectLink(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(422).json({ success: false, message: "Invalid id." });
      } else {
        const orig_URL = await URL.findOne({ short_url: id });

        if (orig_URL && orig_URL.expiresAt && orig_URL.expiresAt > Date.now()) {
          const currDate = generateDate();
          const urlId = orig_URL._id;
          let createdAt = orig_URL.createdAt;
          createdAt = createdAt.toISOString().split("T")[0];
          orig_URL.hit_ratio++;
          await orig_URL.save();
          await Analysis.findOneAndUpdate(
            { url: urlId, hit_date: currDate },
            { $inc: { day_wise_hit_count: 1 }, link_gen_date: createdAt },
            { upsert: true, new: true }
          );
          return res.status(302).redirect(orig_URL.orig_url);
        } else {
          return res.status(302).redirect("https://google.com");
        }
      }
    } catch (err) {
      console.log("Error occured while getting original url", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
  async getUrls(req, res) {
    try {
      const urls = await URL.find({ user: req.user }).sort({ createdAt: -1 });
      return res
        .status(200)
        .json({ success: true, message: "Success", data: urls });
    } catch (err) {
      console.log("Error occured while getting urls", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
  async getAnalysis(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(422).json({ success: false, message: "Invalid id." });
      } else {
        const data = await Analysis.find({ url: id }).select(
          "hit_date day_wise_hit_count -_id"
        );
        res.status(200).json({ success: true, message: "Done", data: data });
      }
    } catch (err) {
      console.log("Error occured while getting url hit wise data", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
  async getAnalysisCreatedDate(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(422).json({ success: false, message: "Invalid id." });
      } else {
        const data = await URL.aggregate([
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
              totalCount: { $sum: "$count" },
            },
          },
        ]);

        res.status(200).json({ success: true, message: "Done", data: data });
      }
    } catch (err) {
      console.log(
        "Error occured while getting url generated day wise url",
        err
      );
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
}
