"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middleware/auth");
const auth = express_1.default.Router();
const routePrefix = "/auth";
auth.post(`${routePrefix}/login`, auth_1.loginUser);
auth.post(`${routePrefix}/logout`, auth_2.authMiddleware, auth_1.logoutUser);
auth.post(`${routePrefix}/logout-all`, auth_2.authMiddleware, auth_1.logoutAllDevices);
module.exports = auth;
