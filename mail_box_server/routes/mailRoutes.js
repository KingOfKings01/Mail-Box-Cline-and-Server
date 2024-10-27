import { getReceivedMails, getSentMailById, getSentMails, sendMail, deleteSentMail } from "../controllers/mailControllers.js";
import { authMiddleware } from "../middleware/auth.js";
import { response, Router } from "express";

const router = Router();

router.post('/send', authMiddleware, sendMail);
router.get('/read/:id', authMiddleware, getSentMailById);
router.get('/sent-mails', authMiddleware, getSentMails);
router.get('/received-mails', authMiddleware, getReceivedMails);
router.delete('/delete/:id', authMiddleware, deleteSentMail);

export default router