"use strict";
const { Model } = require("sequelize");

export interface ISeqModule {
  id: number;
  name: string;
  description: string;
  key: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Module extends Model<ISeqModule> implements ISeqModule {
    id!: number;
    name!: string;
    description!: string;
    key!: string;
    static associate(models: any) {
      Module.hasMany(models.Permission, {
        foreignKey: "moduleId",
        as: "Permissions",
      });
    }
  }
  Module.init(
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
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Modules",
      modelName: "Module",
    }
  );
  return Module;
};
