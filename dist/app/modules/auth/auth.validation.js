"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.RegisterZodSchema = zod_1.default.object({
    firstName: zod_1.default
        .string({ error: "First name must be string" })
        .min(2, { message: "First name must be at least 2 characters long." })
        .max(50, { message: "First name cannot exceed 50 characters." }),
    lastName: zod_1.default
        .string({ error: "Last name must be string" })
        .min(2, { message: "Last name must be at least 2 characters long." })
        .max(50, { message: "Last name cannot exceed 50 characters." }),
    email: zod_1.default
        .string({ error: "Email must be string" })
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    password: zod_1.default
        .string({ error: "Password must be string" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
    })
        .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
    })
        .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
    }),
});
