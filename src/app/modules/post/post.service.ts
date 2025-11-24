
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { fileUploader } from "../../utils/fileUploader";
import { IPost } from "./post.interface";
import { Post } from "./post.model";


const createPost = async (payload: IPost & { file: Express.Multer.File }, decodedUser: JwtPayload) => {

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
        .populate({
            path: "creator",
            select: "_id firstName lastName"
        })
        .populate({
            path: "likes",
            select: "_id firstName lastName"
        })
        .populate({
            path: "comments",
            select: "_id description user_id likes replies createdAt",
            populate: [
                {
                    path: "user_id",
                    select: "_id firstName lastName"
                },
                {
                    path: "likes",
                    select: "_id firstName lastName"
                },
                {
                    path: "replies",
                    select: "_id description user_id likes createdAt",
                    populate: [
                        {
                            path: "user_id",
                            select: "_id firstName lastName"
                        },
                        {
                            path: "likes",
                            select: "_id firstName lastName"
                        }
                    ]
                }
            ]
        });

    return result;
};

const updateLikeState = async (decodedUser: JwtPayload, postId: string) => {

    const post = await Post.findById(postId);

    if (!post) {
        throw new Error("Post not found");
    }

    const userId = decodedUser.userId;

    const alreadyLiked = post?.likes?.includes(userId);

    if (alreadyLiked) {
        post.likes = post?.likes?.filter(
            (id: string) => id.toString() !== userId.toString()
        );
    } else {
        post?.likes?.push(userId);
    }

    const updatedPost = await post.save();

    return updatedPost
};

export const PostService = {
    createPost,
    getAllPosts,
    updateLikeState
}