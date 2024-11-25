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
exports.updatePermissionFromDB = exports.getPermissionByIdFromDB = exports.getAllPermissionsFromDB = exports.createPermissionInDB = void 0;
const index_1 = __importDefault(require("../models/index"));
const createPermissionInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isPermission = yield index_1.default.Permission.findOne({
        where: {
            name: payload.name,
        },
    });
    if (isPermission) {
        throw new Error("Permission already exists");
    }
    const createdPermission = yield index_1.default.Permission.create(payload);
    return createdPermission.dataValues;
});
exports.createPermissionInDB = createPermissionInDB;
const getAllPermissionsFromDB = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (page - 1) * limit;
    const permissions = yield index_1.default.Permission.findAndCountAll({
        include: [
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
        totalUsers: permissions.count,
        totalPages: Math.ceil(permissions.count / limit),
        currentPage: page,
        permissions: permissions.rows,
    };
});
exports.getAllPermissionsFromDB = getAllPermissionsFromDB;
const getPermissionByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getPermission = yield index_1.default.Permission.findOne({
        where: { id: id },
    });
    return getPermission;
});
exports.getPermissionByIdFromDB = getPermissionByIdFromDB;
const updatePermissionFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.default.Permission.update(payload, {
        where: { id: payload.id },
        individualHooks: true,
    });
    return payload.id;
});
exports.updatePermissionFromDB = updatePermissionFromDB;
