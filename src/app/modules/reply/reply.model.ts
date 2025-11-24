import { model, Schema } from "mongoose";
import { IReply } from "./reply.interface";

const replySchema = new Schema<IReply>(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        description: {
            type: String,
            required: true
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comment_id: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },

    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const Reply = model<IReply>("Reply", replySchema);
