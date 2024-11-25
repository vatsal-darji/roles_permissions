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
exports.updatePermission = exports.getAllPermissions = exports.createPermission = void 0;
const permission_1 = require("../services/permission");
const createPermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const permissionPayload = {
            name: req.body.name,
            description: req.body.description,
            moduleId: req.body.moduleId,
        };
        const createdPermission = yield (0, permission_1.createPermissionInDB)(permissionPayload);
        return res.status(200).json({
            success: true,
            message: "permission created successfully!",
            data: createdPermission,
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
exports.createPermission = createPermission;
const getAllPermissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const allPermissions = yield (0, permission_1.getAllPermissionsFromDB)(page, limit);
        return res.status(200).json({
            success: true,
            message: "permissions got!",
            data: allPermissions,
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
exports.getAllPermissions = getAllPermissions;
const updatePermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const permissionPayload = {
            id: id,
            name: req.body.name,
            description: req.body.description,
            moduleId: req.body.moduleId,
        };
        const updatedPermission = yield (0, permission_1.updatePermissionFromDB)(permissionPayload);
        res.status(200).json({
            message: "permission updated",
            success: true,
            data: updatedPermission,
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
exports.updatePermission = updatePermission;
