import { JwtPayload } from "jsonwebtoken";
import { IComment } from "./comment.interface";
import { Comment } from "./comment.model";
import { Post } from "../post/post.model";




const createComment = async (payload: IComment, decodedUser: JwtPayload) => {

    const session = await Comment.startSession();
    session.startTransaction();

    try {
        const updatedPayload = {
            ...payload,
            user_id: decodedUser?.userId
        };

        const comment = await Comment.create([
            updatedPayload
        ], { session });


        await Post.findByIdAndUpdate(payload?.post_id, {
            comments: comment[0]?._id
        }, {
            new: true,
            runValidators: true,
            session
        });

        await session.commitTransaction();
        session.endSession();

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

const updateLikeState = async (decodedUser: JwtPayload, commentId: string) => {

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new Error("Comment not found");
    }

    const userId = decodedUser.userId;

    const alreadyLiked = comment?.likes?.includes(userId);

    if (alreadyLiked) {
        comment.likes = comment?.likes?.filter(
            (id: string) => id.toString() !== userId.toString()
        );
    } else {
        comment?.likes?.push(userId);
    }

    const updatedComment = await comment.save();

    return updatedComment
};

export const CommentService = {
    createComment,
    updateLikeState
}