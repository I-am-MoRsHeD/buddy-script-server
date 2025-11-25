"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const auth_service_1 = require("./auth.service");
const setCookies_1 = require("../../utils/setCookies");
const register = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.AuthServices.register(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "User created successfully",
        data: user
    });
}));
const login = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInfo = yield auth_service_1.AuthServices.login(req.body);
    (0, setCookies_1.setCookies)(res, loginInfo);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "User logged in successfully",
        data: loginInfo
    });
}));
const getMe = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield auth_service_1.AuthServices.getMe(user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "User info retrived successfully",
        data: result
    });
}));
const logout = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "User logged out successfully",
        data: null
    });
}));
exports.AuthController = {
    register,
    login,
    logout,
    getMe
};
