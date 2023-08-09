import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { verifyToken } from "../utils/verifyToken.js";

export const isLogin = expressAsyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401);
    throw err;
  }
});
