import express from "express";
import {
  createPermission,
  getAllPermissions,
  updatePermission,
} from "../controllers/permission";
import { authMiddleware } from "../middleware/auth";
import { guard } from "../middleware/authGuard";
const permissionRouter = express.Router();
const routePrefix = "/permission";

permissionRouter.post(
  `${routePrefix}/create`,
  authMiddleware,
  guard("permissionModule.CREATE"),
  createPermission
);

permissionRouter.get(
  `${routePrefix}/all`,
  authMiddleware,
  guard("permissionModule.READ"),
  getAllPermissions
);

permissionRouter.put(
  `${routePrefix}/update/:id`,
  authMiddleware,
  guard("permissionModule.UPDATE"),
  updatePermission
);

module.exports = permissionRouter;
