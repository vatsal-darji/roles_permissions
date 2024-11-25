"use strict";
const { Model } = require("sequelize");

export interface ISeqRolePermission {
  roleId: number;
  permissionId: number;
  moduleId: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class RolePermission
    extends Model<ISeqRolePermission>
    implements ISeqRolePermission
  {
    roleId!: number;
    permissionId!: number;
    moduleId!: number;
    static associate(models: any) {
      RolePermission.belongsTo(models.Role, {
        foreignKey: "roleId",
        as: "role",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // Many-to-one association with Permission
      RolePermission.belongsTo(models.Permission, {
        foreignKey: "permissionId",
        as: "permission",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      RolePermission.belongsTo(models.Module, {
        foreignKey: "moduleId",
        as: "module",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  RolePermission.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
        primaryKey: true,
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "permissions",
          key: "id",
        },
        primaryKey: true,
      },
      moduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "modules",
          key: "id",
        },
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "Rolepermissions",
      modelName: "RolePermission",
      indexes: [
        {
          unique: true,
          fields: ["roleId", "permissionId"], // Composite unique key to prevent duplicate entries
        },
      ],
    }
  );
  return RolePermission;
};
