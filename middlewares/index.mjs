import Post from "../models/post.mjs";
import User from "../models/user.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const requireSignin = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization?.split(" ")[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token to the request object
    req.user = decoded;

    // Call the next middleware
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

















// ...

export const canEditDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    if (req.user._id != post.postedBy) {
      return res.status(400).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== "Admin") {
      return res.status(400).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
