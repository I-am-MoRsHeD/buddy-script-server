/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PostService } from "./post.service";
import { IPost } from "./post.interface";


const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const payload = {
        ...req.body,
        file: req?.file || ""
    };

    const post = await PostService.createPost(payload as IPost & { file: Express.Multer.File }, user);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Post created successfully",
        data: post
    });
});

export const PostController = {
    createPost
}