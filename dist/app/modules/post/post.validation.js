"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const post_interface_1 = require("./post.interface");
exports.createPostZodSchema = zod_1.default.object({
    description: zod_1.default
        .string({ error: "Description must be string" })
        .min(2, { message: "Description must be at least 2 characters long." })
        .max(5000, { message: "Description cannot exceed 5000 characters." }).optional(),
    imageUrl: zod_1.default.
        string().optional(),
    privacy: zod_1.default.
        enum(Object.values(post_interface_1.Privacy))
        .optional()
});
