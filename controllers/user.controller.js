import { prisma } from "../db/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      res.status(409).json({ error: "User already exists" });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    res.cookie("jwt_token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 365 * 1000,
      expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log("error while creating user", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    res.cookie("jwt_token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 365 * 1000,
      expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log("error while logging in user", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt_token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("error while logging out user", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const currentUser = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(currentUser);
  } catch (error) {
    console.log("error while getting user", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        name,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error while updating user", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.user.id,
      },
    });
    res.clearCookie("jwt_token");
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("error while deleting user", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
