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
exports.updateUser = exports.getAllUsers = exports.createUser = void 0;
const user_1 = require("../services/user");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPayload = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password,
            roleId: req.body.roleId || 3,
        };
        const user = yield (0, user_1.createUserInDB)(userPayload);
        return res.status(200).json({
            success: true,
            message: "user created successfully!",
            data: user,
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
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const users = yield (0, user_1.getAllUsersFromDB)(page, limit);
        return res.status(200).json({
            success: true,
            message: "users got!",
            data: users,
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
exports.getAllUsers = getAllUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const userPayload = {
            id: id,
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password,
            roleId: req.body.roleId,
        };
        const updatedUser = yield (0, user_1.updateUserFromDB)(userPayload);
        res.status(200).json({
            message: "user updated",
            success: true,
            data: updatedUser,
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
exports.updateUser = updateUser;
