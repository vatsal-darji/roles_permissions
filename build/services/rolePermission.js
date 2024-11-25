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
exports.deleteRolePermissionFromDB = exports.updateRolePermissionFromDB = exports.getAllRolesPermissionsFromDB = exports.createRolePermissionInDB = void 0;
const index_1 = __importDefault(require("../models/index"));
const createRolePermissionInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isRolePermission = yield index_1.default.RolePermission.findOne({
        where: {
            roleId: payload.roleId,
            permissionId: payload.permissionId,
            moduleId: payload.moduleId,
        },
    });
    if (isRolePermission) {
        console.log("Role-Permission already exist");
    }
    const createdRolePermission = yield index_1.default.RolePermission.create(payload);
    return createdRolePermission.dataValues;
});
exports.createRolePermissionInDB = createRolePermissionInDB;
const getAllRolesPermissionsFromDB = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (page - 1) * limit;
    const rolePermissions = yield index_1.default.RolePermission.findAndCountAll({
        include: [
            {
                model: index_1.default.Role,
                as: "role",
                attributes: ["name"],
            },
            {
                model: index_1.default.Permission,
                as: "permission",
                attributes: ["name"],
            },
            {
                model: index_1.default.Module,
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
});
exports.getAllRolesPermissionsFromDB = getAllRolesPermissionsFromDB;
const updateRolePermissionFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.default.RolePermission.update(payload, {
        where: {
            roleId: payload.roleId,
            permissionId: payload.permissionId,
            moduleId: payload.moduleId,
        },
        individualHooks: true,
    });
    return payload;
});
exports.updateRolePermissionFromDB = updateRolePermissionFromDB;
const deleteRolePermissionFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.default.RolePermission.destroy({
        where: {
            roleId: payload.roleId,
            permissionId: payload.permissionId,
            moduleId: payload.moduleId,
        },
        individualHooks: true,
    });
    return payload.moduleId, payload.roleId, payload.permissionId;
});
exports.deleteRolePermissionFromDB = deleteRolePermissionFromDB;
