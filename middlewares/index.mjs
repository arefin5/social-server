import Post from "../models/post.mjs";
import User from "../models/user.mjs";
import dotenv from 'dotenv';
import expressJwt from "express-jwt";

  dotenv.config();
// export const requireSignin = expressJwt({
//   secret: 'shhhhhhared-secret',
//   algorithms: ['HS256']
// });


export const requireSignin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.query.token;
  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Attach the decoded token to the request object
    req.user = decoded;
    next();
  });
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
