import express from "express";
import {
  validateCreateTask,
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { authenticate } from "../middleware/authenticate"

const router = express.Router();


router.get("/tasks",async (req,res)=>{
  res.json(tasks)},authenticate, getTasks);
router.post("/tasks",authenticate, validateCreateTask, createTask);
router.put("/tasks/:id", authenticate, updateTask);
router.delete("/tasks/:id", authenticate, deleteTask);

export default router;
