import express from "express";
import ToDo from "./ToDo/index";
import User from "./User/index";
const router = express.Router();

router.use("/toDo", ToDo);
router.use("/user", User);
export default router;
