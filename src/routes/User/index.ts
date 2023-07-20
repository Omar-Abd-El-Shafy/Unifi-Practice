import express from "express";
import { Request, Response } from "express";
const router = express.Router();
import { registerUser, login } from "../../services/User";
import { logger } from "../../core/logger";

router.post("/register", async (req, res) => {
  try {
    const { email, password, userName } = req.body;

    const user = await registerUser(email, password, userName);
    if (!user) {
      throw new Error("user already exists");
    }
    res.status(200).json("user registered successfully");
  } catch (e) {
    logger.error(e);
    res.status(409).json({ message: "user Alrady exists" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.status(200).json({ token });
  } catch (e: any) {
    logger.error(e);
    res.status(401).json(e.message);
  }
});

export default router;
