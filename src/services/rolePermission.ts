import db from "../models/index";
import {
  createRolePermissionType,
  deleteRolePermissionType,
  updateRolePermissionType,
} from "../types/role_permission";

export const createRolePermissionInDB = async (
  payload: createRolePermissionType
) => {
  const isRolePermission = await db.RolePermission.findOne({
    where: {
      roleId: payload.roleId,
      permissionId: payload.permissionId,
      moduleId: payload.moduleId,
    },
  });
  if (isRolePermission) {
    console.log("Role-Permission already exist");
  }
  const createdRolePermission = await db.RolePermission.create(payload);
  return createdRolePermission.dataValues;
};

export const getAllRolesPermissionsFromDB = async (
  page: number,
  limit: number
) => {
  const offset = (page - 1) * limit;
  const rolePermissions = await db.RolePermission.findAndCountAll({
    include: [
      {
        model: db.Role,
        as: "role",
        attributes: ["name"],
      },
      {
        model: db.Permission,
        as: "permission",
        attributes: ["name"],
      },
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
    totalUsers: rolePermissions.count,
    totalPages: Math.ceil(rolePermissions.count / limit),
    currentPage: page,
    RolePermissions: rolePermissions.rows,
  };
};

export const updateRolePermissionFromDB = async (
  payload: updateRolePermissionType
) => {
  await db.RolePermission.update(payload, {
    where: {
      roleId: payload.roleId,
      permissionId: payload.permissionId,
      moduleId: payload.moduleId,
    },
    individualHooks: true,
  });
  return payload;
};

export const deleteRolePermissionFromDB = async (
  payload: deleteRolePermissionType
) => {
  await db.RolePermission.destroy({
    where: {
      roleId: payload.roleId,
      permissionId: payload.permissionId,
      moduleId: payload.moduleId,
    },
    individualHooks: true,
  });
  return payload.moduleId, payload.roleId, payload.permissionId;
};
