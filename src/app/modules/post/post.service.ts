
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { fileUploader } from "../../utils/fileUploader";
import { IPost } from "./post.interface";
import { Post } from "./post.model";


const createPost = async (payload: IPost & { file: Express.Multer.File }, decodedUser: JwtPayload) => {
    console.log(payload);
    if (!payload.description && !payload.file) {
        throw new AppError(400, "Empty post cannot be created")
    };

    if (payload.file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(payload.file);
        payload.imageUrl = uploadToCloudinary?.secure_url;
    };

    const updatedPayload = {
        ...payload,
        creator: decodedUser?.userId
    };

    const result = await Post.create(updatedPayload);

    return result;
};

const getAllPosts = async () => {
    const result = await Post.find()
        .sort({ createdAt: -1 })
        // .populate({
        //     path: "likedInfo",
        //     select: "_id status"
        // })
        // .populate({
        //     path: "commentInfo",
        //     select: "_id description",
        //     populate: {
        //         path: "likedInfo",
        //         select: "_id status"
        //     }
        // })
        // .populate({
        //     path: "replyInfo",
        //     select: "_id description"
        // });

    return result;
};


export const PostService = {
    createPost,
    getAllPosts
}