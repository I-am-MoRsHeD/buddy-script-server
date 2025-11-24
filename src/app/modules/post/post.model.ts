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
        type: String
    },
    privacy: {
        type: String,
        enum: Object.values(Privacy),
        default: Privacy.PUBLIC
    },
    likedInfo: {
        type: String,
    },
    commentInfo: {
        type: String,
    },
    replyInfo: {
        type: String,
    },
}, {
    versionKey: false,
    timestamps: true,
});


export const Post = model<IPost>("Post", postSchema);