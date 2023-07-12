import mongoose from "mongoose";
import dotenv from 'dotenv';

  dotenv.config();
export const connectDb = async () => {
  console.log(process.env.DATABASE_URL)
  try {
    await mongoose.connect(`mongodb+srv://Arefin4:8wuY7JAN6BQncdau@cluster0.c4jxb.mongodb.net/`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("DB connected");
  } catch (error) {
    console.error("DB CONNECTION ERROR:", error.message);
    process.exit(1); // Exit the process with a failure code
  }
};