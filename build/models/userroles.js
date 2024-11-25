"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserRoles extends Model {
        static associate(models) {
            // define association here
            UserRoles.belongsTo(models.User, {
                targetKey: "id",
                foreignKey: "userId",
                onDelete: "RESTRICT",
                onUpdate: "RESTRICT",
            });
            UserRoles.belongsTo(models.Role, {
                targetKey: "id",
                foreignKey: "roleId",
                onDelete: "RESTRICT",
                onUpdate: "RESTRICT",
            });
        }
    }
    UserRoles.init({
        userId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
        roleId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    }, {
        sequelize,
        modelName: "UserRoles",
    });
    return UserRoles;
};
