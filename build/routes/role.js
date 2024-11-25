"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const role_1 = require("../controllers/role");
const role = express_1.default.Router();
const routePrefix = "/role";
role.post(`${routePrefix}/create`, auth_1.authMiddleware, role_1.createRole);
role.get(`${routePrefix}/getAll`, auth_1.authMiddleware, role_1.getAllRoles);
module.exports = role;
