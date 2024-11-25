"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const auth_1 = require("../middleware/auth");
const authGuard_1 = require("../middleware/authGuard");
const user = express_1.default.Router();
const routePrefix = "/user";
user.put(`${routePrefix}/update/:id`, auth_1.authMiddleware, (0, authGuard_1.guard)("subAdminModule.UPDATE"), user_1.updateUser);
user.post(`${routePrefix}/createUser`, user_1.createUser);
user.get(`${routePrefix}/all`, auth_1.authMiddleware, (0, authGuard_1.guard)("userModule.READ"), user_1.getAllUsers);
module.exports = user;
