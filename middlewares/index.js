import Post from "../models/post";
import expressJwt from "express-jwt";
require("dotenv").config();

export const requireSignin = expressJwt({
  secret:'shhhhhhared-secret' || process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

// app.get('/protected',
//   jwt({ secret: 'shhhhhhared-secret', algorithms: ['HS256'] }),
//   function(req, res) {
//     if (!req.user.admin) return res.sendStatus(401);
//     res.sendStatus(200);
//   });




export const canEditDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    // console.log("POST in EDITDELETE MIDDLEWARE => ", post);
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
    // console.log("isAdmin ===> ", user);
    if (user.role !== "Admin") {
      return res.status(400).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
