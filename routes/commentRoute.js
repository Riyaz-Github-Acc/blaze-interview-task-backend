import express from "express";
import { isLogin } from "../middlewares/authMiddleware.js";
import { addComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/:postId", isLogin, addComment);

export default router;
