"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String,
        required: true
    },
    post_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post"
    },
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    replies: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Reply",
        },
    ],
}, {
    versionKey: false,
    timestamps: true,
});
exports.Comment = (0, mongoose_1.model)("Comment", commentSchema);
