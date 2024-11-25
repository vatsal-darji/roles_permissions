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
exports.getAllRoles = exports.createRole = void 0;
const role_1 = require("../services/role");
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rolePayload = {
            name: req.body.name,
            description: req.body.description,
            key: req.body.key,
        };
        const createdRole = yield (0, role_1.createRoleInDB)(rolePayload);
        return res.status(200).json({
            success: true,
            message: "role created successfully!",
            data: createdRole,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            data: null,
        });
    }
});
exports.createRole = createRole;
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getRoles = yield (0, role_1.getAllRolesFromDB)();
        return res.status(200).json({
            success: true,
            message: "roles got successfully!",
            data: getRoles,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            data: null,
        });
    }
});
exports.getAllRoles = getAllRoles;
