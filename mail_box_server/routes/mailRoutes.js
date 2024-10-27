import { getReceivedMails, getSentMailById, getSentMails, sendMail } from "../controllers/mailControllers.js";
import { authMiddleware } from "../middleware/auth.js";
import { response, Router } from "express";

const router = Router();

router.get('/read/:id', authMiddleware, getSentMailById);
router.post('/send', authMiddleware, sendMail);
// router.post('/send', authMiddleware, (req, res)=>{
//     res.json({test:'TestMail'})
// });
router.get('/sent-mails', authMiddleware, getSentMails);
router.get('/received-mails', authMiddleware, getReceivedMails);

export default router