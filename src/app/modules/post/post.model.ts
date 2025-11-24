import { model, Schema } from "mongoose";
import { IPost, Privacy } from "./post.interface";


const postSchema = new Schema<IPost>({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "USER",
        required: true
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String,
        default: ""
    },
    privacy: {
        type: String,
        enum: Object.values(Privacy),
        default: Privacy.PUBLIC
    },
    likedInfo: {
        type: String,
        default: ''
    },
    commentInfo: {
        type: String,
        default: ''
    },
    replyInfo: {
        type: String,
        default: ''
    },
}, {
    versionKey: false,
    timestamps: true,
});


export const Post = model<IPost>("Post", postSchema);