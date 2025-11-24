import { Router } from "express"
import { authRoutes } from "../modules/auth/auth.route";
import { postRoutes } from "../modules/post/post.route";


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
];


moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
});