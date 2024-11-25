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
exports.logoutAllDevices = exports.logoutUser = exports.loginUser = void 0;
const auth_1 = require("../services/auth");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyData = req.body;
        const user = yield (0, auth_1.validateUser)({
            email: bodyData.email,
            password: bodyData.password,
        });
        const token = (yield (0, auth_1.login)(user)).access_token;
        return res.status(200).json({
            success: true,
            message: "user logged in successfully!",
            data: Object.assign({ token }, user),
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: null,
        });
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const userId = req.user.id;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "No token provided",
                data: null,
            });
        }
        yield (0, auth_1.logout)(token, userId);
        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
            data: null,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: null,
        });
    }
});
exports.logoutUser = logoutUser;
const logoutAllDevices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const activeTokens = yield (0, auth_1.invalidateAllUserTokens)(userId);
        return res.status(200).json({
            success: true,
            message: "Logged out from all devices successfully",
            data: {
                sessionsTerminated: activeTokens.length,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: null,
        });
    }
});
exports.logoutAllDevices = logoutAllDevices;
