import { Router } from "express";
import { PostController } from "./post.controller";
import { fileUploader } from "../../utils/fileUploader";
import { checkAuth } from "../../utils/checkAuth";
import { validateSchema } from "../../middleware/validateSchema";
import { createPostZodSchema } from "./post.validation";



const router = Router();


router.get('/',
    checkAuth(),
    PostController.getAllPosts);

router.post('/create',
    checkAuth(),
    fileUploader.upload.single('file'),
    validateSchema(createPostZodSchema),
    PostController.createPost);

router.patch(`/like-unlike/:id`,
    checkAuth(),
    PostController.updateLikeState);

export const postRoutes = router;