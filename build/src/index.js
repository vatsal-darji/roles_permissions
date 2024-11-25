"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const sequelize = require("../utils/db");
app.get("/", () => {
    console.log("server started");
});
sequelize
    .sync()
    .then(() => {
    console.log("server connected");
})
    .catch((error) => {
    console.log("error ===> ", error);
});
app.listen(8000, () => {
    console.log("server connected successfully");
});
