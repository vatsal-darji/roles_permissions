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
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
            User.belongsTo(models.Role, {
                foreignKey: "roleId",
                as: "role",
            });
        }
    }
    User.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        fname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Roles",
                key: "id",
            },
        },
    }, {
        sequelize,
        tableName: "Users",
        modelName: "User",
    });
    User.addHook("beforeCreate", (user) => __awaiter(void 0, void 0, void 0, function* () {
        const password = user.getDataValue("password");
        if (password) {
            user.setDataValue("password", bcrypt.hashSync(password, bcrypt.genSaltSync(10)));
        }
    }));
    User.addHook("beforeUpdate", (user) => __awaiter(void 0, void 0, void 0, function* () {
        const password = user.getDataValue("password");
        if (password) {
            user.setDataValue("password", bcrypt.hashSync(password, bcrypt.genSaltSync(10)));
        }
    }));
    return User;
};
