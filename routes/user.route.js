import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/verifyJwt.js";

const router = Router();

router.post("/sign-up", createUser);
router.post("/sign-in", loginUser);
router.get("/sign-out", logoutUser);
router.get("/me", verifyJWT, getUser);
router.put("/update-user", verifyJWT, updateUser);
router.delete("/delete-user", verifyJWT, deleteUser);

export default router;
