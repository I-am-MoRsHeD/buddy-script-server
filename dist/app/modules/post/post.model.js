"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const post_interface_1 = require("./post.interface");
const postSchema = new mongoose_1.Schema({
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
        default: "",
    },
    privacy: {
        type: String,
        enum: Object.values(post_interface_1.Privacy),
        default: post_interface_1.Privacy.PUBLIC,
    },
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    comments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ]
}, {
    versionKey: false,
    timestamps: true,
});
exports.Post = (0, mongoose_1.model)("Post", postSchema);
