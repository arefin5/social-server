import mongoose from "mongoose";
import dotenv from 'dotenv';

  dotenv.config();
export const connectDb = async () => {
  try {
    await mongoose.connect(`mongodb+srv://Arefin4:pED2QsRJOFAdI9fy@cluster0.uai65.mongodb.net/`, {
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