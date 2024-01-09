import express from "express";
import UrlController from "../controller/url.controller.js";
import UserController from "../controller/user.controller.js";
import validateUser from "../middleware/auth.middleware.js";
const router = express.Router();
const urlController = new UrlController();
const userController = new UserController();
router.get("/api/urls", validateUser, (req, res) => {
  urlController.getUrls(req, res);
});
router.post("/api/", validateUser, (req, res) => {
  urlController.shortLink(req, res);
});
router.get("/api/:id", (req, res) => {
  urlController.redirectLink(req, res);
});
router.post("/api/signin", (req, res) => {
  userController.signIn(req, res);
});
router.post("/api/signup", (req, res) => {
  userController.signUp(req, res);
});
router.get("/api/urls", validateUser, (req, res) => {
  urlController.getUrls(req, res);
});
router.get("/api/analysis/urlhit/:id", validateUser, (req, res) => {
  urlController.getAnalysis(req, res);
});
router.get("/api/analysis/urlgen/:id", (req, res) => {
  urlController.getAnalysisCreatedDate(req, res);
});
router.use("*", (req, res) => {
  res.status(404).json({ sucess: false, message: "Invalid request." });
});
export default router;
