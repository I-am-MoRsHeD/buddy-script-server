import { model, Schema } from "mongoose";
import { IComment } from "./comment.interface";

const commentSchema = new Schema<IComment>(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },

        description: {
            type: String,
            required: true
        },
        post_id: {
            type: Schema.Types.ObjectId,
            ref: "Post"
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        replies: [
            {
                type: Schema.Types.ObjectId,
                ref: "Reply",
            },
        ],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const Comment = model<IComment>("Comment", commentSchema);
