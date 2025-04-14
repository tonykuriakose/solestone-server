import express from "express";
import { validateSignup , signup, validateLogin, login } from "../controllers/authController";

const router = express.Router(); 

router.post("/signup", validateSignup , signup); 
router.post("/login",validateLogin,login);

export default router;
