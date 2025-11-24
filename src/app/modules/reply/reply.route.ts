import { Router } from "express";
import { checkAuth } from "../../utils/checkAuth";
import { validateSchema } from "../../middleware/validateSchema";
import { createReplyZodSchema } from "./reply.validation";
import { ReplyController } from "./reply.controller";



const router = Router();



router.post('/create',
    checkAuth(),
    validateSchema(createReplyZodSchema),
    ReplyController.createReply);

router.patch(`/like-unlike/:id`,
    checkAuth(),
    ReplyController.updateLikeState);

export const replyRoutes = router;