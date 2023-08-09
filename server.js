import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import commentRoute from "./routes/commentRoute.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Blog Application");
});

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
