import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "PayTm",
    });
    console.log(`🟢 Mongo db connected:`, connection.connection.host);
  } catch (error) {
    console.error("Mongodb Error");
  }
};

export default dbConnection;
