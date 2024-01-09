import mongoose from "mongoose";

export const connectUsingMongoose = async () => {
  try {
    mongoose.connect(process.env.DB_URL, {});
    console.log("Connected with MongoDB");
  } catch (err) {
    console.log("Unable to connect with MongoDB", err);
  }
};
