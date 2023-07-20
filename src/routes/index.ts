import express from "express";
import ToDo from "./ToDo/index";
const router = express.Router();

router.use("/toDo", ToDo);

export default router;
