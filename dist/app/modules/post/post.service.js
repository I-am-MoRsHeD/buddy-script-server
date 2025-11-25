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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const fileUploader_1 = require("../../utils/fileUploader");
const post_model_1 = require("./post.model");
const createPost = (payload, decodedUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.description && !payload.file) {
        throw new AppError_1.default(400, "Empty post cannot be created");
    }
    ;
    if (payload.file) {
        const uploadToCloudinary = yield fileUploader_1.fileUploader.uploadToCloudinary(payload.file);
        payload.imageUrl = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    }
    ;
    const updatedPayload = Object.assign(Object.assign({}, payload), { creator: decodedUser === null || decodedUser === void 0 ? void 0 : decodedUser.userId });
    const result = yield post_model_1.Post.create(updatedPayload);
    return result;
});
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.find()
        .sort({ createdAt: -1 })
        .populate({
        path: "creator",
        select: "_id firstName lastName"
    })
        .populate({
        path: "likes",
        select: "_id firstName lastName"
    })
        .populate({
        path: "comments",
        select: "_id description user_id likes replies createdAt",
        populate: [
            {
                path: "user_id",
                select: "_id firstName lastName"
            },
            {
                path: "likes",
                select: "_id firstName lastName"
            },
            {
                path: "replies",
                select: "_id description user_id likes createdAt",
                populate: [
                    {
                        path: "user_id",
                        select: "_id firstName lastName"
                    },
                    {
                        path: "likes",
                        select: "_id firstName lastName"
                    }
                ]
            }
        ]
    });
    return result;
});
const updateLikeState = (decodedUser, postId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const post = yield post_model_1.Post.findById(postId);
    if (!post) {
        throw new Error("Post not found");
    }
    const userId = decodedUser.userId;
    const alreadyLiked = (_a = post === null || post === void 0 ? void 0 : post.likes) === null || _a === void 0 ? void 0 : _a.includes(userId);
    if (alreadyLiked) {
        post.likes = (_b = post === null || post === void 0 ? void 0 : post.likes) === null || _b === void 0 ? void 0 : _b.filter((id) => id.toString() !== userId.toString());
    }
    else {
        (_c = post === null || post === void 0 ? void 0 : post.likes) === null || _c === void 0 ? void 0 : _c.push(userId);
    }
    const updatedPost = yield post.save();
    return updatedPost;
});
exports.PostService = {
    createPost,
    getAllPosts,
    updateLikeState
};
