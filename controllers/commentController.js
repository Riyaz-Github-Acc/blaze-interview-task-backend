import expressAsyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";

export const addComment = expressAsyncHandler(async (req, res) => {
  const { comment } = req.body;
  const { postId } = req.params;
  const postFound = await Post.findById(postId);

  if (!postFound) {
    res.status(404);
    throw new Error("Post not found");
  }

  const existingComment = await Comment.findOne({
    post: postFound._id,
    user: req.user._id,
  });

  if (existingComment) {
    res.status(400);
    throw new Error("Comment already added by user");
  }

  const newComment = await Comment.create({
    comment,
    post: postId,
    user: req.user._id,
  });

  postFound.comments.push(newComment._id);
  await postFound.save();

  res.status(200).json({
    message: "Comment added successfully",
    data: newComment,
  });
});
