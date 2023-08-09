import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import { isLogin } from "../middlewares/authMiddleware.js";
import {
  deleteUser,
  profile,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", isLogin, profile);
router.put("/updateUser", isLogin, updateUser);
router.delete("/deleteUser", isLogin, deleteUser);

export default router;
