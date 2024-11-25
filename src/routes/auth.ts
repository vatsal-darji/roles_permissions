import express from "express";
import { loginUser, logoutAllDevices, logoutUser } from "../controllers/auth";
import { authMiddleware } from "../middleware/auth";
const auth = express.Router();
const routePrefix = "/auth";

auth.post(`${routePrefix}/login`, loginUser);
auth.post(`${routePrefix}/logout`, authMiddleware, logoutUser);
auth.post(`${routePrefix}/logout-all`, authMiddleware, logoutAllDevices);

module.exports = auth;
