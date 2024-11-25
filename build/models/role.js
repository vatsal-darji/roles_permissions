"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            Role.hasMany(models.User);
            Role.belongsToMany(models.Permission, {
                through: "RolePermission",
                foreignKey: "roleId",
                as: "permissions",
            });
        }
    }
    Role.init({
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
            allowNull: true,
            unique: true,
        },
    }, {
        sequelize,
        tableName: "Roles",
        modelName: "Role",
    });
    return Role;
};
