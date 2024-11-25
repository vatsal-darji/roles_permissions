"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

export interface ISeqUser {
  id: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
  roleId: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<ISeqUser> implements ISeqUser {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    fname!: string;
    lname!: string;
    email!: string;
    password!: string;
    roleId!: number;
    static associate(models: any) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: "roleId",
        as: "role",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Roles",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "Users",
      modelName: "User",
    }
  );
  User.addHook("beforeCreate", async (user: any) => {
    const password = user.getDataValue("password");
    if (password) {
      user.setDataValue(
        "password",
        bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      );
    }
  });

  User.addHook("beforeUpdate", async (user: any) => {
    const password = user.getDataValue("password");

    if (password) {
      user.setDataValue(
        "password",
        bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      );
    }
  });

  return User;
};
