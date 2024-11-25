import { Request, Response } from "express";
import {
  createPermissionType,
  updatePermissionType,
} from "../types/permission";
import {
  createPermissionInDB,
  getAllPermissionsFromDB,
  updatePermissionFromDB,
} from "../services/permission";
import generalResponse from "../helpers/generalResponse";

export const createPermission = async (req: Request, res: Response) => {
  try {
    const permissionPayload: createPermissionType = {
      name: req.body.name,
      description: req.body.description,
      moduleId: req.body.moduleId,
    };

    const createdPermission = await createPermissionInDB(permissionPayload);
    return res.status(200).json({
      success: true,
      message: "permission created successfully!",
      data: createdPermission,
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

export const getAllPermissions = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const allPermissions = await getAllPermissionsFromDB(page, limit);

    return res.status(200).json({
      success: true,
      message: "permissions got!",
      data: allPermissions,
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

export const updatePermission = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const permissionPayload: updatePermissionType = {
      id: id,
      name: req.body.name,
      description: req.body.description,
      moduleId: req.body.moduleId,
    };
    const updatedPermission = await updatePermissionFromDB(permissionPayload);
    res.status(200).json({
      message: "permission updated",
      success: true,
      data: updatedPermission,
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
