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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRolePermission = exports.getAllRolePermissions = exports.createRolePermission = void 0;
const rolePermission_1 = require("../services/rolePermission");
const createRolePermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rolePermissionPayload = {
            roleId: req.body.roleId,
            moduleId: req.body.moduleId,
            permissionId: req.body.permissionId,
        };
        const createdRolePermission = yield (0, rolePermission_1.createRolePermissionInDB)(rolePermissionPayload);
        return res.status(200).json({
            success: true,
            message: "Role-Permission created successfully!",
            data: createdRolePermission,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: null,
        });
    }
});
exports.createRolePermission = createRolePermission;
const getAllRolePermissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const allRolesPermissions = yield (0, rolePermission_1.getAllRolesPermissionsFromDB)(page, limit);
        return res.status(200).json({
            success: true,
            message: "all Roles-Permissions got!",
            data: allRolesPermissions,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: null,
        });
    }
});
exports.getAllRolePermissions = getAllRolePermissions;
const deleteRolePermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteRolePermissionPayload = {
            roleId: req.body.roleId,
            moduleId: req.body.moduleId,
            permissionId: req.body.permissionId,
        };
        yield (0, rolePermission_1.deleteRolePermissionFromDB)(deleteRolePermissionPayload);
        return res.status(200).json({
            success: true,
            message: "Roles-Permission Deleted!",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: null,
        });
    }
});
exports.deleteRolePermission = deleteRolePermission;
