import db from "../models/index";
import {
  createPermissionType,
  updatePermissionType,
} from "../types/permission";

export const createPermissionInDB = async (payload: createPermissionType) => {
  const isPermission = await db.Permission.findOne({
    where: {
      name: payload.name,
    },
  });
  if (isPermission) {
    throw new Error("Permission already exists");
  }
  const createdPermission = await db.Permission.create(payload);
  return createdPermission.dataValues;
};

export const getAllPermissionsFromDB = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const permissions = await db.Permission.findAndCountAll({
    include: [
      {
        model: db.Module,
        as: "module",
        attributes: ["name"],
      },
    ],
    limit: limit,
    offset: offset,
  });
  return {
    totalUsers: permissions.count,
    totalPages: Math.ceil(permissions.count / limit),
    currentPage: page,
    permissions: permissions.rows,
  };
};

export const getPermissionByIdFromDB = async (id: number) => {
  const getPermission = await db.Permission.findOne({
    where: { id: id },
  });
  return getPermission;
};

export const updatePermissionFromDB = async (payload: updatePermissionType) => {
  await db.Permission.update(payload, {
    where: { id: payload.id },
    individualHooks: true,
  });
  return payload.id;
};
