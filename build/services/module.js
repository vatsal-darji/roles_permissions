"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModuleInDB = void 0;
const index_1 = __importDefault(require("../models/index"));
const createModuleInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const moduleName = yield index_1.default.Module.findOne({
        where: {
            key: payload.key,
        },
    });
    if (moduleName) {
        throw new Error("Module already exists");
    }
    const createdModule = yield index_1.default.Module.create(payload);
    return createdModule.dataValues.key;
});
exports.createModuleInDB = createModuleInDB;
