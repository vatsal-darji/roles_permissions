import { Request, Response } from "express";
import {
  createRolePermissionType,
  deleteRolePermissionType,
  updateRolePermissionType,
} from "../types/role_permission";
import {
  createRolePermissionInDB,
  deleteRolePermissionFromDB,
  getAllRolesPermissionsFromDB,
  updateRolePermissionFromDB,
} from "../services/rolePermission";
import generalResponse from "../helpers/generalResponse";

export const createRolePermission = async (req: Request, res: Response) => {
  try {
    const rolePermissionPayload: createRolePermissionType = {
      roleId: req.body.roleId,
      moduleId: req.body.moduleId,
      permissionId: req.body.permissionId,
    };

    const createdRolePermission = await createRolePermissionInDB(
      rolePermissionPayload
    );
    return res.status(200).json({
      success: true,
      message: "Role-Permission created successfully!",
      data: createdRolePermission,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

export const getAllRolePermissions = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const allRolesPermissions = await getAllRolesPermissionsFromDB(page, limit);

    return res.status(200).json({
      success: true,
      message: "all Roles-Permissions got!",
      data: allRolesPermissions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

export const deleteRolePermission = async (req: Request, res: Response) => {
  try {
    const deleteRolePermissionPayload: deleteRolePermissionType = {
      roleId: req.body.roleId,
      moduleId: req.body.moduleId,
      permissionId: req.body.permissionId,
    };
    await deleteRolePermissionFromDB(deleteRolePermissionPayload);

    return res.status(200).json({
      success: true,
      message: "Roles-Permission Deleted!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};
