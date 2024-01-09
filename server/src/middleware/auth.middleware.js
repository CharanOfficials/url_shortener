import jwt from "jsonwebtoken";
const validateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization?.split(" ")[1];
    if (!authHeader) {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized User." });
    } else {
      const payloadJWT = jwt.verify(authHeader, process.env.JWT_SECRET);
      req.user = payloadJWT.userId;
      next();
    }
  } catch (err) {
    if (err.name === `TokenExpiredError`) {
      return res
        .status(401)
        .json({ status: false, message: "Token has expired." });
    } else {
      console.log("Error while verifying token", err);
      return res.status(401).json({ status: false, message: "Error occured." });
    }
  }
};
export default validateUser;
