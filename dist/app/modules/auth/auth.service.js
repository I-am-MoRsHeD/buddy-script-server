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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_model_1 = require("./auth.model");
const userTokens_1 = require("../../utils/userTokens");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const env_1 = require("../../config/env");
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload, rest = __rest(payload, ["email", "password"]);
    const isUserExist = yield auth_model_1.User.findOne({ email });
    if (isUserExist) {
        throw new AppError_1.default(409, 'User already exists');
    }
    ;
    const bcryptedPassword = yield bcryptjs_1.default.hash(password, Number(env_1.envVars.BCRYPT_SALT_ROUNDS));
    const userPayload = Object.assign({ email, password: bcryptedPassword }, rest);
    const user = yield auth_model_1.User.create(userPayload);
    return user;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield auth_model_1.User.findOne({ email });
    if (!isUserExist) {
        throw new AppError_1.default(400, 'Email does not exist');
    }
    ;
    const bcryptedPassword = yield bcryptjs_1.default.compare(password, isUserExist.password);
    if (!bcryptedPassword) {
        throw new AppError_1.default(400, "Password is incorrect");
    }
    ;
    const userTokens = (0, userTokens_1.createUserTokens)(isUserExist);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _a = isUserExist.toObject(), { password: pass } = _a, rest = __rest(_a, ["password"]);
    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest
    };
});
const getMe = (decodedUser) => __awaiter(void 0, void 0, void 0, function* () {
    return yield auth_model_1.User.findById(decodedUser === null || decodedUser === void 0 ? void 0 : decodedUser.userId);
});
exports.AuthServices = {
    register,
    login,
    getMe
};
