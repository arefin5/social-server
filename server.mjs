import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import auth from './routes/auth.mjs';
import post from "./routes/post.mjs";
import { connectDb } from "./helpers/db.mjs";
import morgan from "morgan";
import dotenv from 'dotenv';

  dotenv.config();
// import mongoose from 'mongoose';
const app = express();
// const http = require("http").createServer(app);
// const io = require("socket.io")(http, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-type"],
//   },
// });

connectDb();
// db
// mongoose
//   .connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => console.log("DB connected"))
//   .catch((err) => console.log("DB CONNECTION ERROR => ", err));

// middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "* "
  })
);
app.get('/', (req, res) => {
  res.send('hello world')
});
// autoload routes
app.use('/api',auth);
app.use('/api',post)
// readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// socketio
// io.on("connect", (socket) => {
//   // console.log("SOCKET>IO", socket.id);
//   socket.on("send-message", (message) => {
//     // console.log("new message received => ", message);
//     socket.broadcast.emit("receive-message", message);
//   });
// });

// io.on("connect", (socket) => {
//   // console.log("SOCKET>IO", socket.id);
//   socket.on("new-post", (newPost) => {
//     // console.log("socketio new post => ", newPost);
//     socket.broadcast.emit("new-post", newPost);
//   });
// });

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
