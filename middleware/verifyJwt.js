import jwt from "jsonwebtoken";
import { prisma } from "../db/db.config.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.jwt_token ||
      req.header("authorization")?.replace("Bearer", "").trim();
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid Token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error while verifying user:", error);
    return res.status(500).json({ message: "Error while verifying user" });
  }
};

export { verifyJWT };
