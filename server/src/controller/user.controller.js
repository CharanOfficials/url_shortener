import Users from "../model/user.schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import encrypt from "../../src/generators/password_gen.js";
export default class UserController {
  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid user." });
      } else {
        const user = await Users.findOne({ email: email });
        if (!user) {
          return res
            .status(400)
            .json({ status: false, message: "Invalid user or password." });
        } else {
          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );
          if (!isPasswordMatched) {
            return res
              .status(400)
              .json({ status: false, message: "Invalid user or password." });
          } else {
            const token = jwt.sign(
              {
                userId: user._id,
                email: user.email,
              },
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );
            return res.status(200).json({
              success: true,
              message: "Logged in successfully.",
              data: {
                token: token,
                userId: user._id,
                userEmail: user.email,
              },
            });
          }
        }
      }
    } catch (err) {
      console.error("Error occured while signinin.", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server error." });
    }
  }

  async signUp(req, res) {
    try {
      const { email, password, name } = req.body;
      if (!email || !password || !name) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid user." });
      } else {
        const user = await Users.find({ email: email });
        if (user.length > 0) {
          return res
            .status(409)
            .json({ status: false, message: "User already exists." });
        } else {
          const pass = await encrypt.crypt(password);
          const user = await Users.create({
            email: email,
            password: pass,
            name: name,
          });
          if (user) {
            res
              .status(200)
              .json({ success: true, messaage: "User created successfully." });
          }
        }
      }
    } catch (err) {
      console.error("Error occured while signing in.", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server error." });
    }
  }
}
