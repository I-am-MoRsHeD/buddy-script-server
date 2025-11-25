"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const post_route_1 = require("../modules/post/post.route");
const comment_route_1 = require("../modules/comment/comment.route");
const reply_route_1 = require("../modules/reply/reply.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.authRoutes
    },
    {
        path: '/posts',
        route: post_route_1.postRoutes
    },
    {
        path: '/comments',
        route: comment_route_1.commentRoutes
    },
    {
        path: '/replies',
        route: reply_route_1.replyRoutes
    },
];
moduleRoutes.forEach(route => {
    exports.router.use(route.path, route.route);
});
