"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("./app/routes");
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const env_1 = require("./app/config/env");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: env_1.envVars.FRONTEND_URL,
    credentials: true
}));
app.set("trust proxy", 1);
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', routes_1.router);
app.get('/', (req, res) => {
    res.send('Welcome to Buddy Script App!!');
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
