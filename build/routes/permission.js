"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const permission_1 = require("../controllers/permission");
const auth_1 = require("../middleware/auth");
const authGuard_1 = require("../middleware/authGuard");
const permissionRouter = express_1.default.Router();
const routePrefix = "/permission";
permissionRouter.post(`${routePrefix}/create`, auth_1.authMiddleware, (0, authGuard_1.guard)("permissionModule.CREATE"), permission_1.createPermission);
permissionRouter.get(`${routePrefix}/all`, auth_1.authMiddleware, (0, authGuard_1.guard)("permissionModule.READ"), permission_1.getAllPermissions);
permissionRouter.put(`${routePrefix}/update/:id`, auth_1.authMiddleware, (0, authGuard_1.guard)("permissionModule.UPDATE"), permission_1.updatePermission);
module.exports = permissionRouter;
