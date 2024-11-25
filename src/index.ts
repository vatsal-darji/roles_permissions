import express, { Application } from "express";
const app: Application = express();
import dotenv from "dotenv";
import cors from "cors";
import { initializePassport } from "./helpers/passportInitialize";

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(initializePassport().initialize());

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
