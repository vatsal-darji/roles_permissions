"use strict";
const { Model } = require("sequelize");

export interface ISeqRole {
  id: number;
  name: string;
  description: string;
  key: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Role extends Model<ISeqRole> implements ISeqRole {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!: string;
    description!: string;
    key!: string;
    static associate(models: any) {
      Role.hasMany(models.User);
      Role.belongsToMany(models.Permission, {
        through: "RolePermission",
        foreignKey: "roleId",
        as: "permissions",
      });
    }
  }
  Role.init(
    {
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
    },
    {
      sequelize,
      tableName: "Roles",
      modelName: "Role",
    }
  );
  return Role;
};
