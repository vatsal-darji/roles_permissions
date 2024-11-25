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
exports.updateUserFromDB = exports.getUserByIdFromDB = exports.getAllUsersFromDB = exports.createUserInDB = void 0;
const index_1 = __importDefault(require("../models/index"));
const createUserInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.default.User.findOne({
        where: {
            email: payload.email,
        },
    });
    if (user) {
        throw new Error("user is already exists");
    }
    const createdUser = yield index_1.default.User.create(payload);
    return createdUser.dataValues;
});
exports.createUserInDB = createUserInDB;
const getAllUsersFromDB = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (page - 1) * limit;
    const users = yield index_1.default.User.findAndCountAll({
        attributes: { exclude: ["password", "RoleId", "roleId", "RolePermission"] },
        include: [
            {
                model: index_1.default.Role,
                as: "role",
                attributes: ["name"],
                // include: [
                //   {
                //     model: db.Permission,
                //     as: "permissions",
                //     attributes: ["name"],
                //     through: { attributes: [] }, //exclude attributes from join table
                //   },
                // ],
            },
        ],
        limit: limit,
        offset: offset,
    });
    return {
        totalUsers: users.count,
        totalPages: Math.ceil(users.count / limit),
        currentPage: page,
        users: users.rows,
    };
});
exports.getAllUsersFromDB = getAllUsersFromDB;
const getUserByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.default.User.findOne({
        where: { id: id },
    });
    return user;
});
exports.getUserByIdFromDB = getUserByIdFromDB;
const updateUserFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.default.User.update(payload, {
        where: { id: payload.id },
        individualHooks: true,
    });
    return payload.id;
});
exports.updateUserFromDB = updateUserFromDB;
