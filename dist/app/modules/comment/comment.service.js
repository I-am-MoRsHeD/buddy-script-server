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
exports.CommentService = void 0;
const comment_model_1 = require("./comment.model");
const post_model_1 = require("../post/post.model");
const createComment = (payload, decodedUser) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield comment_model_1.Comment.startSession();
    session.startTransaction();
    try {
        const updatedPayload = Object.assign(Object.assign({}, payload), { user_id: decodedUser === null || decodedUser === void 0 ? void 0 : decodedUser.userId });
        const comment = yield comment_model_1.Comment.create([
            updatedPayload
        ], { session });
        yield post_model_1.Post.findByIdAndUpdate(payload === null || payload === void 0 ? void 0 : payload.post_id, {
            comments: (_a = comment[0]) === null || _a === void 0 ? void 0 : _a._id
        }, {
            new: true,
            runValidators: true,
            session
        });
        yield session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const updateLikeState = (decodedUser, commentId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const comment = yield comment_model_1.Comment.findById(commentId);
    if (!comment) {
        throw new Error("Comment not found");
    }
    const userId = decodedUser.userId;
    const alreadyLiked = (_a = comment === null || comment === void 0 ? void 0 : comment.likes) === null || _a === void 0 ? void 0 : _a.includes(userId);
    if (alreadyLiked) {
        comment.likes = (_b = comment === null || comment === void 0 ? void 0 : comment.likes) === null || _b === void 0 ? void 0 : _b.filter((id) => id.toString() !== userId.toString());
    }
    else {
        (_c = comment === null || comment === void 0 ? void 0 : comment.likes) === null || _c === void 0 ? void 0 : _c.push(userId);
    }
    const updatedComment = yield comment.save();
    return updatedComment;
});
exports.CommentService = {
    createComment,
    updateLikeState
};
