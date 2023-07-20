import express from "express";
import { Request, Response } from "express";
const router = express.Router();
import {
  getTasks,
  addTask,
  getTask,
  deleteTask,
  updateTask,
} from "../../services/ToDo";
import { logger } from "../../core/logger";

router.get("/task", async (req: Request, res: Response) => {
  try {
    const taskId = req.query.taskId;
    const task = await getTask(taskId as string);
    res.status(200).json(task);
  } catch (e) {
    logger.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, username, taskName, taskDescription } = req.body;
    const task = await addTask(userId, username, taskName, taskDescription);
    res.status(200).json(task);
  } catch (e) {
    logger.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    const taskId = req.query.taskId;
    const task = await deleteTask(taskId as string);
    res.status(200).json(task);
  } catch (e) {
    logger.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:taskId", async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const task = await updateTask(taskId as string, req.body);
    res.status(200).json(task);
  } catch (e) {
    logger.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
