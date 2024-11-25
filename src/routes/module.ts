import express from "express";
import { authMiddleware } from "../middleware/auth";
import { createModule } from "../controllers/module";
const moduleRouter = express.Router();
const routePrefix = "/module";

moduleRouter.post(`${routePrefix}/create`, createModule);

module.exports = moduleRouter;
