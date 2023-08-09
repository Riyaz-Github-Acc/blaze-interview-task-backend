import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const profile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      message: "user fetched successfully",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const updateUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "user updated successfully",
      data: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.user._id);

  if (user) {
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
