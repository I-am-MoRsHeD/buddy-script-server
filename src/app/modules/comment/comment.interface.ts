import { Types } from "mongoose";


export interface IComment {
    user_id: Types.ObjectId;
    description: string;
    likes: string[];
    post_id: Types.ObjectId;
    replies: string[]
}