"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const post_service_1 = require("./post.service");
const createPost = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const payload = Object.assign(Object.assign({}, req.body), { file: (req === null || req === void 0 ? void 0 : req.file) || "" });
    const post = yield post_service_1.PostService.createPost(payload, user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Post created successfully",
        data: post
    });
}));
const getAllPosts = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.PostService.getAllPosts();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "All post retrived successfully",
        data: result
    });
}));
const updateLikeState = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { id } = req.params;
    const result = yield post_service_1.PostService.updateLikeState(user, id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Liked post successfully",
        data: result
    });
}));
exports.PostController = {
    createPost,
    getAllPosts,
    updateLikeState
};
