/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PostService } from "./post.service";
import { IPost } from "./post.interface";
import { JwtPayload } from "jsonwebtoken";


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

const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await PostService.getAllPosts();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All post retrived successfully",
        data: result
    });
});

const updateLikeState = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { id } = req.params;

    const result = await PostService.updateLikeState(user as JwtPayload, id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Liked post successfully",
        data: result
    });
});

export const PostController = {
    createPost,
    getAllPosts,
    updateLikeState
}