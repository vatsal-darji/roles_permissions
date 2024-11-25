"use strict";
const { Model } = require("sequelize");

export interface ISeqBlacklistedToken {
  id: number;
  token: string;
  userId: number;
  expiresAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class BlacklistedToken
    extends Model<ISeqBlacklistedToken>
    implements ISeqBlacklistedToken
  {
    id!: number;
    token!: string;
    userId!: number;
    expiresAt!: Date;

    static associate(models: any) {
      // Add association with User model
      BlacklistedToken.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  BlacklistedToken.init(
    {
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
    },
    {
      sequelize,
      modelName: "BlacklistedToken",
    }
  );
  return BlacklistedToken;
};
