"use strict";
const { Model } = require("sequelize");

export interface ISeqPermission {
  id: number;
  name: string;
  description: string;
  moduleId: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Permission extends Model<ISeqPermission> implements ISeqPermission {
    id!: number;
    name!: string;
    description!: string;
    moduleId!: number;
    static associate(models: any) {
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
  Permission.init(
    {
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
    },
    {
      sequelize,
      tableName: "Permissions",
      modelName: "Permission",
    }
  );
  return Permission;
};
