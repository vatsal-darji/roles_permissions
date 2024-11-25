import db from "../models/index";
import { createUserType, updateUserType } from "../types/users";

const createUserInDB = async (payload: createUserType) => {
  const user = await db.User.findOne({
    where: {
      email: payload.email,
    },
  });
  if (user) {
    throw new Error("user is already exists");
  }
  const createdUser = await db.User.create(payload);
  return createdUser.dataValues;
};

const getAllUsersFromDB = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const users = await db.User.findAndCountAll({
    attributes: { exclude: ["password", "RoleId", "roleId", "RolePermission"] },
    include: [
      {
        model: db.Role,
        as: "role",
        attributes: ["name"],
        // include: [
        //   {
        //     model: db.Permission,
        //     as: "permissions",
        //     attributes: ["name"],
        //     through: { attributes: [] }, //exclude attributes from join table
        //   },
        // ],
      },
    ],
    limit: limit,
    offset: offset,
  });
  return {
    totalUsers: users.count,
    totalPages: Math.ceil(users.count / limit),
    currentPage: page,
    users: users.rows,
  };
};

const getUserByIdFromDB = async (id: number) => {
  const user = await db.User.findOne({
    where: { id: id },
  });
  return user;
};

const updateUserFromDB = async (payload: updateUserType) => {
  await db.User.update(payload, {
    where: { id: payload.id },
    individualHooks: true,
  });
  return payload.id;
};

export {
  createUserInDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserFromDB,
};
