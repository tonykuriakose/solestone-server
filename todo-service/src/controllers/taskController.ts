import { Request, Response, NextFunction } from "express";
import { PrismaClient, TaskStatus, TaskPriority } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  tags: z.array(z.string()).optional(),
});


export const validateCreateTask = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    taskSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid task input" });
  }
};


export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, dueDate, status, priority, tags } = req.body;
    const userId = req.user?.id

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        status,
        priority,
        tags,
        userId, 
      },
    });

    console.log(task);
    

    res.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, status, priority, tags } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        status,
        priority,
        tags,
      },
    });

    res.status(200).json(task);
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id },
    });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
