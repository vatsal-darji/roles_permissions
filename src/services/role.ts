import db from "../models/index";
import { createRoleType } from "../types/role";

const createRoleInDB = async (payload: createRoleType) => {
  const roleName = await db.Role.findOne({
    where: {
      key: payload.key,
    },
  });
  if (roleName) {
    throw new Error("Role already exists");
  }
  const createdRole = await db.Role.create(payload);
  return createdRole.dataValues.key;
};

const getAllRolesFromDB = async () => {
  const roles = await db.Role.findAll();
  return roles;
};

export { createRoleInDB, getAllRolesFromDB };
