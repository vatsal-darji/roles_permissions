"use strict";
const { Model } = require("sequelize");

export interface ISeqUserRole {
  id: number;
  userId: number;
  roleId: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class UserRoles extends Model<ISeqUserRole> implements ISeqUserRole {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    userId!: number;
    roleId!: number;

    static associate(models: any) {
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
  UserRoles.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      roleId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    },
    {
      sequelize,
      modelName: "UserRoles",
    }
  );
  return UserRoles;
};
