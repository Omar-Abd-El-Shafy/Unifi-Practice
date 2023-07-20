import express from "express";
import { Request, Response } from "express";
import authenticateJWT from "../../middleware/auth";
const router = express.Router();
import {
  getTasks,
  addTask,
  getTask,
  deleteTask,
  updateTask,
} from "../../services/ToDo";
import { logger } from "../../core/logger";

router.get("/task", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const taskId = req.query.taskId;
    const task = await getTask(taskId as string);
    res.status(200).json(task);
  } catch (e) {
    logger.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", authenticateJWT, async (req, res) => {
  try {
    const { taskName, taskDescription } = req.body;
    //@ts-ignore
    const userName = req.user.userName;
    //@ts-ignore
    const userId = req.user.id;
    const task = await addTask(userId, userName, taskName, taskDescription);
    res.status(200).json(task);
  } catch (e) {
    logger.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/allTasks", authenticateJWT, async (req, res) => {
  try {
    //@ts-ignore
    const userName = req.user.userName;
    const tasks = await getTasks(userName as string);
    res.status(200).json(tasks);
  } catch (e) {
    logger.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const taskId = req.query.taskId;
    const task = await deleteTask(taskId as string);
    res.status(200).json(task);
  } catch (e) {
    logger.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:taskId", authenticateJWT, async (req: Request, res: Response) => {
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
