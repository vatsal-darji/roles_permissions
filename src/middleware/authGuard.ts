import { Request, Response, NextFunction } from "express";
import db from "../models/index";
import passport from "passport";
import { ISeqUser } from "../models/user";

export const guard = (...modulePermissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      const roleId = (req.user as ISeqUser).roleId;

      for (const modulePermission of modulePermissions) {
        const [moduleName, permissionString] = modulePermission.split(".");

        const permission = await db.Permission.findOne({
          where: { name: permissionString },
          include: [
            {
              model: db.Module,
              as: "module",
              where: { key: moduleName },
            },
          ],
        });

        if (!permission) {
          return res.status(403).json({
            message:
              "Forbidden: You don't have permission to access this resource.",
          });
        }

        const rolePermission = await db.RolePermission.findOne({
          where: {
            permissionId: permission.id,
            roleId: roleId,
            moduleId: permission.moduleId,
          },
        });

        if (!rolePermission) {
          return res.status(403).json({
            message:
              "Forbidden: You don't have permission to access this resource.",
          });
        }
      }

      return next(); //if all permisions match
    } catch (error) {
      console.error("Guard middleware error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
