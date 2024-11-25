"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const module_1 = require("../controllers/module");
const moduleRouter = express_1.default.Router();
const routePrefix = "/module";
moduleRouter.post(`${routePrefix}/create`, module_1.createModule);
module.exports = moduleRouter;
