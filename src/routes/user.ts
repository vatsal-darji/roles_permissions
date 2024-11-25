import express from "express";
import { createUser, getAllUsers, updateUser } from "../controllers/user";
import { authMiddleware } from "../middleware/auth";
import { guard } from "../middleware/authGuard";
const user = express.Router();
const routePrefix = "/user";

user.put(
  `${routePrefix}/update/:id`,
  authMiddleware,
  guard("subAdminModule.UPDATE"),
  updateUser
);
user.post(`${routePrefix}/createUser`, createUser);
user.get(
  `${routePrefix}/all`,
  authMiddleware,
  guard("userModule.READ"),
  getAllUsers
);

module.exports = user;
