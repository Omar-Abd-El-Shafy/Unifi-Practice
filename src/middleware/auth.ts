import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtSecret } from "../config";
const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Bearer <token>

    try {
      const user = jwt.verify(token, jwtSecret as string);
      console.log("userin JWT", user);
      //@ts-ignore
      req.user = user;
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authenticateJWT;
