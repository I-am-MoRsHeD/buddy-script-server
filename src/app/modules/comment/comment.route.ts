import { Router } from "express";
import { checkAuth } from "../../utils/checkAuth";
import { validateSchema } from "../../middleware/validateSchema";
import { createCommentZodSchema } from "./comment.validation";
import { CommentController } from "./comment.controller";



const router = Router();



router.post('/create',
    checkAuth(),
    validateSchema(createCommentZodSchema),
    CommentController.createComment);

router.patch(`/like-unlike/:id`,
    checkAuth(),
    CommentController.updateLikeState);

export const commentRoutes = router;