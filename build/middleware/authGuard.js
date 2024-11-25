"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guard = void 0;
const index_1 = __importDefault(require("../models/index"));
const guard = (...modulePermissions) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }
            const roleId = req.user.roleId;
            for (const modulePermission of modulePermissions) {
                const [moduleName, permissionString] = modulePermission.split(".");
                const permission = yield index_1.default.Permission.findOne({
                    where: { name: permissionString },
                    include: [
                        {
                            model: index_1.default.Module,
                            as: "module",
                            where: { key: moduleName },
                        },
                    ],
                });
                if (!permission) {
                    return res.status(403).json({
                        message: "Forbidden: You don't have permission to access this resource.",
                    });
                }
                const rolePermission = yield index_1.default.RolePermission.findOne({
                    where: {
                        permissionId: permission.id,
                        roleId: roleId,
                        moduleId: permission.moduleId,
                    },
                });
                if (!rolePermission) {
                    return res.status(403).json({
                        message: "Forbidden: You don't have permission to access this resource.",
                    });
                }
            }
            return next(); //if all permisions match
        }
        catch (error) {
            console.error("Guard middleware error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
};
exports.guard = guard;
