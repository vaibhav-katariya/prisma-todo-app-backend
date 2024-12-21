import { prisma } from "../db/db.config.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "All input is required" });
    }
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: req.user.id,
      },
    });
    if (!newPost) {
      return res.status(400).json({ message: "Post creation failed" });
    }
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(400).json({ message: "Unauthorized" });
    }
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!posts) {
      return res.status(400).json({ message: "Posts not found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Post ID is required" });
    }
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }
    if (post.authorId !== req.user.id) {
      return res.status(400).json({ message: "Unauthorized" });
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
      },
    });
    if (!updatedPost) {
      return res.status(400).json({ message: "Post update failed" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Post ID is required" });
    }
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }
    if (post.authorId !== req.user.id) {
      return res.status(400).json({ message: "Unauthorized" });
    }
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
