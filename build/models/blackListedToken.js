"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class BlacklistedToken extends Model {
        static associate(models) {
            // Add association with User model
            BlacklistedToken.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
            });
        }
    }
    BlacklistedToken.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "BlacklistedToken",
    });
    return BlacklistedToken;
};
