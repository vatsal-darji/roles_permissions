"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        static associate(models) {
            Permission.belongsTo(models.Module, {
                foreignKey: "moduleId",
                as: "module",
            });
            Permission.belongsToMany(models.Role, {
                through: "RolePermissions",
                foreignKey: "permissionId",
                as: "roles",
            });
        }
    }
    Permission.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        moduleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "modules", // Table name of the associated model
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },
    }, {
        sequelize,
        tableName: "Permissions",
        modelName: "Permission",
    });
    return Permission;
};
