import { Router } from "express";
import { createUser } from "../controllers/userControllers.js";

const router = Router();

router.get('/test', (req, res) => {
    res.json({ message: "This is the sign-in endpoint" });
})
router.post("/sing-in", createUser);

export default router