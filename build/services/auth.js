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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateAllUserTokens = exports.isTokenBlacklisted = exports.logout = exports.validateUser = exports.login = void 0;
const index_1 = __importDefault(require("../models/index"));
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_2 = require("jsonwebtoken");
const sequelize_1 = require("sequelize");
const validateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { dataValues: getUser } = yield index_1.default.User.findOne({
        where: {
            email: user.email,
        },
    });
    if (getUser && getUser.password) {
        const isMatch = yield bcrypt_1.default.compare(user.password, getUser.password);
        if (isMatch) {
            const { password } = getUser, result = __rest(getUser, ["password"]);
            return result;
        }
        else {
            throw new Error("Invalid credentials");
        }
    }
    else {
        throw new Error("Invalid credentials");
    }
});
exports.validateUser = validateUser;
const login = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = { id: user.id, email: user.email, roleId: user.roleId }; // Include id
    const token = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, {
        expiresIn: "365d",
    });
    return {
        access_token: token,
    };
});
exports.login = login;
const logout = (token, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = (0, jsonwebtoken_2.verify)(token, process.env.JWT_SECRET);
        const expiresAt = new Date(decoded.exp * 1000);
        yield index_1.default.BlacklistedToken.create({
            token,
            userId,
            expiresAt,
        });
        return true;
    }
    catch (error) {
        throw new Error("Invalid token");
    }
});
exports.logout = logout;
// Add utility function to invalidate all tokens for a user
const invalidateAllUserTokens = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const activeTokens = yield index_1.default.BlacklistedToken.findAll({
        where: {
            userId,
            expiresAt: {
                [sequelize_1.Op.gt]: new Date(),
            },
        },
    });
    return activeTokens;
});
exports.invalidateAllUserTokens = invalidateAllUserTokens;
// Updated function to check if a token is blacklisted
const isTokenBlacklisted = (token, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const blacklistedToken = yield index_1.default.BlacklistedToken.findOne({
        where: {
            token,
            userId,
            expiresAt: {
                [sequelize_1.Op.gt]: new Date(), // Only check non-expired tokens
            },
        },
    });
    return !!blacklistedToken;
});
exports.isTokenBlacklisted = isTokenBlacklisted;
