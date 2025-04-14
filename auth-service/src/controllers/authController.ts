import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});


export const validateSignup = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    
    
   const data =  signupSchema.parse(req.body);
   console.log(data);
   
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid input data" });
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    console.log(token);
    

    res.status(201).json({
      user: { id: user.id, email: user.email, name: user.name },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const data = loginSchema.parse(req.body);
    console.log(data);
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid login input" });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({ userId: user.id },process.env.JWT_SECRET!,{ expiresIn: "1h" });

    res.status(200).json({
      user: { id: user.id, email: user.email, name: user.name },
      token,
      message:"User login successful"
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
