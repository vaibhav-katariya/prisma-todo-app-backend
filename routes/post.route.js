import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJwt.js";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = Router();

router.post("/create-post", verifyJWT, createPost);
router.get("/get-posts", verifyJWT, getPosts);
router.get("/get-postBy-id/:id", verifyJWT, getPostById);
router.put("/update-post/:id", verifyJWT, updatePost);
router.delete("/delete-post/:id", verifyJWT, deletePost);

export default router;
