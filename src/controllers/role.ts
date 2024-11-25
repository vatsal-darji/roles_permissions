import { Request, Response } from "express";
import { createRoleType } from "../types/role";
import { createRoleInDB, getAllRolesFromDB } from "../services/role";

const createRole = async (req: Request, res: Response) => {
  try {
    const rolePayload: createRoleType = {
      name: req.body.name,
      description: req.body.description,
      key: req.body.key,
    };

    const createdRole = await createRoleInDB(rolePayload);
    return res.status(200).json({
      success: true,
      message: "role created successfully!",
      data: createdRole,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      data: null,
    });
  }
};

const getAllRoles = async (req: Request, res: Response) => {
  try {
    const getRoles = await getAllRolesFromDB();
    return res.status(200).json({
      success: true,
      message: "roles got successfully!",
      data: getRoles,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      data: null,
    });
  }
};

export { createRole, getAllRoles };
