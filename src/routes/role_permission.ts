import express from "express";
import {
  createRolePermission,
  deleteRolePermission,
  getAllRolePermissions,
} from "../controllers/role_permission";
import { authMiddleware } from "../middleware/auth";
import { guard } from "../middleware/authGuard";
const rolePermissionRouter = express.Router();
const routePrefix = "/rolePermission";

rolePermissionRouter.post(
  `${routePrefix}/create`,
  authMiddleware,
  guard("permissionModule.CREATE"),
  createRolePermission
);

rolePermissionRouter.get(
  `${routePrefix}/all`,
  authMiddleware,
  guard("permissionModule.READ"),
  getAllRolePermissions
);

rolePermissionRouter.delete(
  `${routePrefix}/delete`,
  authMiddleware,
  guard("permissionModule.READ"),
  deleteRolePermission
);

// rolePermissionRouter.put(
//   `${routePrefix}/update/:moduleId`,
//   authMiddleware,
//   guard("permissionModule.UPDATE"),
//   updateRolePermission
// );

module.exports = rolePermissionRouter;
