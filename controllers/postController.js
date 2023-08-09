import expressAsyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

// Create
export const createPost = expressAsyncHandler(async (req, res) => {
  const { title, desc, img } = req.body;

  const postExists = await Post.findOne({ title });
  if (postExists) {
    res.status(400);
    throw new Error("post already exists");
  }

  const newPost = await Post.create({
    title,
    desc,
    img: req?.file?.path,
    author: req.user._id,
  });

  res.status(200).json({
    message: "Post created successfully",
    data: newPost,
  });
});

// Update
export const updatePost = expressAsyncHandler(async (req, res) => {
  const { title, desc, img } = req.body;
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (post.author.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized, only author of the post is allowed");
  }

  post.title = title || post.title;
  post.desc = desc || post.desc;
  post.img = req?.file?.path || post.img;

  const updatedPost = await post.save();

  res.status(200).json({
    message: "Post updated successfully",
    data: updatedPost,
  });
});

// Delete
export const deletePost = expressAsyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (post.author.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized, only author of the post is allowed");
  }

  await post.deleteOne();

  res.status(200).json({
    message: "Post deleted successfully",
  });
});

// Get Post
export const getPost = expressAsyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username",
      },
    })
    .populate({
      path: "author",
      select: "username",
    });

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  res.status(200).json({
    message: "Post fetched successfully",
    data: post,
  });
});

// Get All Posts
export const getAllPosts = expressAsyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate({
      path: "author",
      select: "username",
    })
    .sort({ createdAt: -1 });

  res.status(200).json({ message: "All posts fetched successfully", posts });
});
