"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const requiredEnvVariables = ["PORT", "MONGO_URL", 'BCRYPT_SALT_ROUNDS', 'NODE_ENV', 'FRONTEND_URL', 'JWT_ACCESS_SECRET', 'JWT_ACCESS_EXPIRES', 'JWT_REFRESH_SECRET', 'JWT_REFRESH_EXPIRES', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET',];
const laodEnvVariables = () => {
    requiredEnvVariables.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new Error(`Missing environment variable: ${envVar}`);
        }
        ;
    });
    return {
        PORT: process.env.PORT,
        MONGO_URL: process.env.MONGO_URL,
        BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
        NODE_ENV: process.env.NODE_ENV,
        FRONTEND_URL: process.env.FRONTEND_URL,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
        CLOUDINARY: {
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
            CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
            CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
        },
    };
};
exports.envVars = laodEnvVariables();
