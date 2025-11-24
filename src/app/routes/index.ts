import { Router } from "express"
import { authRoutes } from "../modules/auth/auth.route";
import { postRoutes } from "../modules/post/post.route";
import { commentRoutes } from "../modules/comment/comment.route";
import { replyRoutes } from "../modules/reply/reply.route";


export const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/posts',
        route: postRoutes
    },
    {
        path: '/comments',
        route: commentRoutes
    },
    {
        path: '/replies',
        route: replyRoutes
    },
];


moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
});