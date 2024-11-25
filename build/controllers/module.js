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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModule = void 0;
const module_1 = require("../services/module");
const createModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modulePayload = {
            name: req.body.name,
            description: req.body.description,
            key: req.body.key,
        };
        const createdModule = yield (0, module_1.createModuleInDB)(modulePayload);
        return res.status(200).json({
            success: true,
            message: "Module created successfully!",
            data: createdModule,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            data: null,
        });
    }
});
exports.createModule = createModule;
