import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./src/router/index.router.js";
import { connectUsingMongoose } from "./src/config/mongoose.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
const startServer = async () => {
  try {
    await connectUsingMongoose();
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening at port no. ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("An error occurred:", error);
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
};
startServer();
