"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Module extends Model {
        static associate(models) {
            Module.hasMany(models.Permission, {
                foreignKey: "moduleId",
                as: "Permissions",
            });
        }
    }
    Module.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "Modules",
        modelName: "Module",
    });
    return Module;
};
