"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const role_permission_1 = require("../controllers/role_permission");
const auth_1 = require("../middleware/auth");
const authGuard_1 = require("../middleware/authGuard");
const rolePermissionRouter = express_1.default.Router();
const routePrefix = "/rolePermission";
rolePermissionRouter.post(`${routePrefix}/create`, auth_1.authMiddleware, (0, authGuard_1.guard)("permissionModule.CREATE"), role_permission_1.createRolePermission);
rolePermissionRouter.get(`${routePrefix}/all`, auth_1.authMiddleware, (0, authGuard_1.guard)("permissionModule.READ"), role_permission_1.getAllRolePermissions);
rolePermissionRouter.delete(`${routePrefix}/delete`, auth_1.authMiddleware, (0, authGuard_1.guard)("permissionModule.READ"), role_permission_1.deleteRolePermission);
// rolePermissionRouter.put(
//   `${routePrefix}/update/:moduleId`,
//   authMiddleware,
//   guard("permissionModule.UPDATE"),
//   updateRolePermission
// );
module.exports = rolePermissionRouter;
