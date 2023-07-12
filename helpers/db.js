const mongoose = require("mongoose");

exports.connectDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://Arefin4:8wuY7JAN6BQncdau@cluster0.c4jxb.mongodb.net/", {
      dbName: "clone-social-midia",
    });

    mongoose.connection.once("open", () => {
      console.log("MongoDB Connection Successfully Opened");
      // Additional code to run when the connection is open
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB Connection Error:", err);
    });

    console.log("MongoDB Connection Successful");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
};
// arefintalukder5  4RB77wUnjdUbwa9C