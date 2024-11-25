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
// // index.ts
const permissionSeeder_1 = require("./permissionSeeder");
const rolePermissionSeeder_1 = require("./rolePermissionSeeder");
const runSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, permissionSeeder_1.seedDB)();
        yield (0, rolePermissionSeeder_1.seedRolePermissions)();
        console.log("Database seeding completed.");
    }
    catch (error) {
        console.error("Error running seeder:", error);
    }
});
runSeeder();
