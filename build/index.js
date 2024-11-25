"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const passportInitialize_1 = require("./helpers/passportInitialize");
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, passportInitialize_1.initializePassport)().initialize());
app.get("/", () => {
    console.log("server started");
});
const users = require("./routes/user");
const auth = require("./routes/auth");
const role = require("./routes/role");
const permissionRouter = require("./routes/permission");
const moduleRouter = require("./routes/module");
const rolePermissionRouter = require("./routes/role_permission");
app.use(users);
app.use(auth);
app.use(role);
app.use(moduleRouter);
app.use(permissionRouter);
app.use(rolePermissionRouter);
app.listen(8000, () => {
    console.log("server connected successfully");
});
