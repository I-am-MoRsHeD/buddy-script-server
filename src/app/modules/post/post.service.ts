
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

export const PostService = {
    createPost
}