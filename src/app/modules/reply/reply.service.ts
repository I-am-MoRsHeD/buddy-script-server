import { JwtPayload } from "jsonwebtoken";
import { IReply } from "./reply.interface";
import { Reply } from "./reply.model";
import { Comment } from "../comment/comment.model";



const createReply = async (payload: IReply, decodedUser: JwtPayload) => {

    const session = await Reply.startSession();
    session.startTransaction();

    try {
        const updatedPayload = {
            ...payload,
            user_id: decodedUser?.userId
        };

        const reply = await Reply.create([
            updatedPayload
        ], { session });


        await Comment.findByIdAndUpdate(payload?.comment_id, {
            replies: reply[0]?._id
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


const updateLikeState = async (decodedUser: JwtPayload, replyId: string) => {

    const reply = await Reply.findById(replyId);

    if (!reply) {
        throw new Error("Reply not found");
    }

    const userId = decodedUser.userId;

    const alreadyLiked = reply?.likes?.includes(userId);

    if (alreadyLiked) {
        reply.likes = reply?.likes?.filter(
            (id: string) => id.toString() !== userId.toString()
        );
    } else {
        reply?.likes?.push(userId);
    }

    return await reply.save();
};


export const ReplyService = {
    createReply,
    updateLikeState
}