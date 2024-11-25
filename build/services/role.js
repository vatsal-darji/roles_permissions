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
exports.getAllRolesFromDB = exports.createRoleInDB = void 0;
const index_1 = __importDefault(require("../models/index"));
const createRoleInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const roleName = yield index_1.default.Role.findOne({
        where: {
            key: payload.key,
        },
    });
    if (roleName) {
        throw new Error("Role already exists");
    }
    const createdRole = yield index_1.default.Role.create(payload);
    return createdRole.dataValues.key;
});
exports.createRoleInDB = createRoleInDB;
const getAllRolesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield index_1.default.Role.findAll();
    return roles;
});
exports.getAllRolesFromDB = getAllRolesFromDB;
