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
exports.seedRolePermissions = void 0;
const index_1 = __importDefault(require("../models/index"));
const seedRolePermissions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rolePermissions = [
            {
                roleName: "Admin",
                permissions: [
                    { name: "CREATE", moduleKey: "subAdminModule" },
                    { name: "READ", moduleKey: "subAdminModule" },
                    { name: "UPDATE", moduleKey: "subAdminModule" },
                    { name: "DELETE", moduleKey: "subAdminModule" },
                    { name: "CREATE", moduleKey: "userModule" },
                    { name: "READ", moduleKey: "userModule" },
                    { name: "UPDATE", moduleKey: "userModule" },
                    { name: "DELETE", moduleKey: "userModule" },
                    { name: "CREATE", moduleKey: "permissionModule" },
                    { name: "READ", moduleKey: "permissionModule" },
                    { name: "UPDATE", moduleKey: "permissionModule" },
                    { name: "DELETE", moduleKey: "permissionModule" },
                ],
            },
            {
                roleName: "Sub-Admin",
                permissions: [
                    { name: "CREATE", moduleKey: "userModule" },
                    { name: "READ", moduleKey: "userModule" },
                    { name: "UPDATE", moduleKey: "userModule" },
                    { name: "DELETE", moduleKey: "userModule" },
                    { name: "READ", moduleKey: "subAdminModule" },
                    { name: "CREATE", moduleKey: "permissionModule" },
                    { name: "READ", moduleKey: "permissionModule" },
                    { name: "UPDATE", moduleKey: "permissionModule" },
                    { name: "DELETE", moduleKey: "permissionModule" },
                ],
            },
            {
                roleName: "User",
                permissions: [{ name: "READ", moduleKey: "userModule" }],
            },
        ];
        for (const rolePerm of rolePermissions) {
            // Find the role by name
            const role = yield index_1.default.Role.findOne({
                where: { name: rolePerm.roleName },
            });
            if (!role) {
                console.error(`Role "${rolePerm.roleName}" not found.`);
                continue;
            }
            for (const permObj of rolePerm.permissions) {
                const { name, moduleKey } = permObj;
                // Find the module and permission by moduleKey and permission name
                const module = yield index_1.default.Module.findOne({ where: { key: moduleKey } });
                if (!module) {
                    console.error(`Module "${moduleKey}" not found.`);
                    continue;
                }
                const permission = yield index_1.default.Permission.findOne({
                    where: { name, moduleId: module.id },
                });
                if (!permission) {
                    console.error(`Permission "${name}" not found for module "${moduleKey}".`);
                    continue;
                }
                // Check if the role-permission association already exists
                const rolePermission = yield index_1.default.RolePermission.findOne({
                    where: { roleId: role.id, permissionId: permission.id },
                });
                // If the association doesn't exist, create it
                if (!rolePermission) {
                    yield index_1.default.RolePermission.create({
                        roleId: role.id,
                        permissionId: permission.id,
                        moduleId: module.id,
                    });
                    console.log(`Assigned permission "${name}" to role "${rolePerm.roleName}".`);
                }
                else {
                    console.log(`Permission "${name}" already assigned to role "${rolePerm.roleName}". Skipping.`);
                }
            }
        }
    }
    catch (error) {
        console.error("Error during role-permission seeding:", error);
    }
});
exports.seedRolePermissions = seedRolePermissions;
