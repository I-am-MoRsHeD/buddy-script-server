"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const globalErrorHelpers_1 = require("../errorHelpers/globalErrorHelpers");
const globalErrorHandler = (err, req, res, next) => {
    if (env_1.envVars.NODE_ENV === 'development')
        console.log(err);
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources = [];
    // Duplicate error
    if (err.code === 11000) {
        const simplifiedError = (0, globalErrorHelpers_1.handleDuplicateError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    // Cast Error
    else if (err.name === 'CastError') {
        const simplifiedError = (0, globalErrorHelpers_1.handleCastError)();
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    // Validation Error
    else if (err.name === 'ValidationError') {
        const simplifiedError = (0, globalErrorHelpers_1.handleMongooseValidationError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    // Zod validation Error
    else if (err.name === 'ZodError') {
        const simplifiedError = (0, globalErrorHelpers_1.handleZodValidationError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: env_1.envVars.NODE_ENV === 'development' ? err : null,
        stack: env_1.envVars.NODE_ENV === 'development' ? err.stack : null
    });
};
exports.globalErrorHandler = globalErrorHandler;
