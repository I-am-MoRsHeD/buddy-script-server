/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { ReplyService } from "./reply.service";


const createReply = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    const result = await ReplyService.createReply(req.body, user);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Reply sent successfully",
        data: result
    });
});

const updateLikeState = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { id } = req.params;

    const result = await ReplyService.updateLikeState(user as JwtPayload, id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Liked reply successfully",
        data: result
    });
});

export const ReplyController = {
    createReply,
    updateLikeState
}