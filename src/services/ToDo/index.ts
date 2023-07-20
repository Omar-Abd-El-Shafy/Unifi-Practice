import Task from "./models/taskModel";
import { logger } from "../../core/logger";
import User from "../User/models/userModel";
import mongoose from "mongoose";
export const getUser = async (userName: string) => {
  try {
    const user = await User.find({ userName: userName });
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

export const getTask = async (taskId: string) => {
  try {
    const task = await Task.findById(new mongoose.Types.ObjectId(taskId));
    return task;
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

export const getTasks = async (userName: string) => {
  try {
    const task = await Task.find({ userName: userName });
    return task;
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

export const addTask = async (
  userId: string,
  userName: string,
  taskName: string,
  taskDescription: string
) => {
  try {
    const task = new Task({
      userId: new mongoose.Types.ObjectId(userId),
      userName,
      taskName,
      taskDescription,
    });
    await task.save();
    return task;
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const task = await Task.findByIdAndDelete(
      new mongoose.Types.ObjectId(taskId)
    );
    return task;
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

export const updateTask = async (taskId: string, body: any) => {
  try {
    const task = await Task.findByIdAndUpdate(taskId, body, { new: true });

    return task;
  } catch (e) {
    logger.error(e);
    throw e;
  }
};
