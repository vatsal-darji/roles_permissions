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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("../services/auth");
const authMiddleware = (req, res, next) => {
    passport_1.default.authenticate("jwt", { session: false }, (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (err) {
            return next(err);
        }
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!user) {
            return res.status(401).json({
                message: "User does not exist",
                success: true,
            });
        }
        else {
            if (token) {
                // Check if token is blacklisted
                const isBlacklisted = yield (0, auth_1.isTokenBlacklisted)(token, user.id);
                if (isBlacklisted) {
                    return res.status(401).json({
                        message: "Token is invalid",
                        success: false,
                    });
                }
            }
            req.user = user;
            return next();
        }
    }))(req, res, next);
};
exports.authMiddleware = authMiddleware;
