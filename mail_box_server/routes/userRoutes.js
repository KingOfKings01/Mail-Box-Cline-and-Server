import { Router } from "express";
import { createUser, loginUser } from "../controllers/userControllers.js";

const router = Router();

router.post("/sing-in", createUser);
router.post("/login", loginUser)

export default router