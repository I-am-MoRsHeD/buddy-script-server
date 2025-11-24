/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { CommentService } from "./comment.service";


const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    const result = await CommentService.createComment(req.body, user);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Comment created successfully",
        data: result
    });
});

const updateLikeState = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { id } = req.params;

    const result = await CommentService.updateLikeState(user as JwtPayload, id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Liked comment successfully",
        data: result
    });
});

export const CommentController = {
    createComment,
    updateLikeState
}