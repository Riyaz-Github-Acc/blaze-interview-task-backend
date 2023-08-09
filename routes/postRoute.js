import express from "express";
import { isLogin } from "../middlewares/authMiddleware.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/postController.js";
import imgUpload from "../config/imgUpload.js";

const router = express.Router();

router.post("/", isLogin, imgUpload.single("file"), createPost);
router.put("/:id", isLogin, imgUpload.single("file"), updatePost);
router.delete("/:id", isLogin, deletePost);
router.get("/:id", getPost);
router.get("/", getAllPosts);

export default router;
