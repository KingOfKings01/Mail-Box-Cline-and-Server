import { getReceivedMails, getSentMails, sendMail } from "../controllers/mailControllers.js";
import { authMiddleware } from "../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.post('/send', authMiddleware, sendMail);
router.get('/sent-mails', authMiddleware, getSentMails);
router.get('/received-mails', authMiddleware, getReceivedMails);

export default router