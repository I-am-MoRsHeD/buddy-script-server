"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply = void 0;
const mongoose_1 = require("mongoose");
const replySchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    description: {
        type: String,
        required: true
    },
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    comment_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Comment",
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Reply = (0, mongoose_1.model)("Reply", replySchema);
