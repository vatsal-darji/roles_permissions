"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("roles_permissions", "root", "root", {
    host: "localhost",
    dialect: "mysql",
});
try {
    sequelize.authenticate();
    console.log("Database Connection successful.");
}
catch (error) {
    console.error("Unable to connect to the database:", error);
}
module.exports = sequelize;
