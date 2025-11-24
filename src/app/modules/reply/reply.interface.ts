import { Types } from "mongoose";



export interface IReply {
    user_id: Types.ObjectId;
    description: string;
    likes: string[];
    comment_id: Types.ObjectId;
}