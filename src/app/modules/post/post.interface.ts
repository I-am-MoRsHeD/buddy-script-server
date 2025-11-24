import { Types } from "mongoose";

export enum Privacy {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}


export interface IPost {
    creator: Types.ObjectId;
    description?: string;
    imageUrl?: string;
    privacy: Privacy;
    likedInfo?: string;
    commentInfo?: string;
    replyInfo?: string;
};