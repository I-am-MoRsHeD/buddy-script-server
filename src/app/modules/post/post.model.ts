import { model, Schema } from "mongoose";
import { IPost, Privacy } from "./post.interface";

const postSchema = new Schema<IPost>(
    {
        creator: {
            type: Schema.Types.ObjectId,
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
            enum: Object.values(Privacy),
            default: Privacy.PUBLIC,
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ]
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const Post = model<IPost>("Post", postSchema);
