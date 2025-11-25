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
exports.ReplyService = void 0;
const reply_model_1 = require("./reply.model");
const comment_model_1 = require("../comment/comment.model");
const createReply = (payload, decodedUser) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield reply_model_1.Reply.startSession();
    session.startTransaction();
    try {
        const updatedPayload = Object.assign(Object.assign({}, payload), { user_id: decodedUser === null || decodedUser === void 0 ? void 0 : decodedUser.userId });
        const reply = yield reply_model_1.Reply.create([
            updatedPayload
        ], { session });
        yield comment_model_1.Comment.findByIdAndUpdate(payload === null || payload === void 0 ? void 0 : payload.comment_id, {
            replies: (_a = reply[0]) === null || _a === void 0 ? void 0 : _a._id
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
const updateLikeState = (decodedUser, replyId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const reply = yield reply_model_1.Reply.findById(replyId);
    if (!reply) {
        throw new Error("Reply not found");
    }
    const userId = decodedUser.userId;
    const alreadyLiked = (_a = reply === null || reply === void 0 ? void 0 : reply.likes) === null || _a === void 0 ? void 0 : _a.includes(userId);
    if (alreadyLiked) {
        reply.likes = (_b = reply === null || reply === void 0 ? void 0 : reply.likes) === null || _b === void 0 ? void 0 : _b.filter((id) => id.toString() !== userId.toString());
    }
    else {
        (_c = reply === null || reply === void 0 ? void 0 : reply.likes) === null || _c === void 0 ? void 0 : _c.push(userId);
    }
    return yield reply.save();
});
exports.ReplyService = {
    createReply,
    updateLikeState
};
