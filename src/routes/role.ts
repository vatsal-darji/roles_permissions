import express from "express";
import { authMiddleware } from "../middleware/auth";
import { createRole, getAllRoles } from "../controllers/role";
const role = express.Router();
const routePrefix = "/role";

role.post(`${routePrefix}/create`, authMiddleware, createRole);
role.get(`${routePrefix}/getAll`, authMiddleware, getAllRoles);

module.exports = role;
