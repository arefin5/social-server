import mongoose from "mongoose";
import dotenv from 'dotenv';

  dotenv.config();
export const connectDb = async () => {
  // mongodb+srv://adnan:<password>@cluster0.uai65.mongodb.net/


  try {
    await mongoose.connect(`mongodb+srv://adnan:wPhgNAF13ULga8tm@cluster0.uai65.mongodb.net/`, {
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