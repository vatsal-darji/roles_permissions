"use strict";
// import db from "../models/index";
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
exports.seedDB = void 0;
// const seedDB = async () => {
//   try {
//     const modules = [
//       { name: "Admin Module", key: "adminModule" },
//       { name: "User Module", key: "userModule" },
//     ];
//     // Seed Modules
//     for (const module of modules) {
//       const isModule = await db.Module.findOne({
//         where: { name: module.name },
//       });
//       if (!isModule) {
//         await db.Module.create(module);
//         console.log(`Module "${module.name}" seeded successfully.`);
//       } else {
//         console.log(
//           `Module "${module.name}" already exists, skipping seeding.`
//         );
//       }
//     }
//     // Fetch modules from the DB for dynamic moduleId assignment
//     const adminModule = await db.Module.findOne({
//       where: { key: "adminModule" },
//     });
//     const userModule = await db.Module.findOne({
//       where: { key: "userModule" },
//     });
//     const subAdminModule = await db.Module.findOne({
//       where: { key: "subAdminModule" },
//     });
//     const permissionModule = await db.Module.findOne({
//       where: { key: "permissionModule" },
//     });
//     const permissions = [
//       {
//         name: "CREATE",
//         description: "Allows creation of a sub admin",
//         moduleId: adminModule.id,
//       },
//       {
//         name: "READ",
//         description: "Allows to view sub admin",
//         moduleId: adminModule.id,
//       },
//       {
//         name: "UPDATE",
//         description: "Allows updation of a sub admin",
//         moduleId: adminModule.id,
//       },
//       {
//         name: "DELETE",
//         description: "Allows deletion of a sub admin",
//         moduleId: adminModule.id,
//       },
//       {
//         name: "CREATE",
//         description: "Allows creation of a user",
//         moduleId: userModule.id,
//       },
//       {
//         name: "READ",
//         description: "Allows to view users",
//         moduleId: userModule.id,
//       },
//       {
//         name: "UPDATE",
//         description: "Allows updation of a user",
//         moduleId: userModule.id,
//       },
//       {
//         name: "DELETE",
//         description: "Allows deletion of a user",
//         moduleId: userModule.id,
//       },
//       {
//         name: "CREATE",
//         description: "Allows creation of a sub admin",
//         moduleId: subAdminModule.id,
//       },
//       {
//         name: "READ",
//         description: "Allows to view sub admin",
//         moduleId: subAdminModule.id,
//       },
//       {
//         name: "UPDATE",
//         description: "Allows updation of a sub admin",
//         moduleId: subAdminModule.id,
//       },
//       {
//         name: "DELETE",
//         description: "Allows deletion of a sub admin",
//         moduleId: subAdminModule.id,
//       },
//       {
//         name: "CREATE",
//         description: "Allows creation of a permission",
//         moduleId: permissionModule.id,
//       },
//       {
//         name: "READ",
//         description: "Allows to view permission",
//         moduleId: permissionModule.id,
//       },
//       {
//         name: "UPDATE",
//         description: "Allows updation of a permission",
//         moduleId: permissionModule.id,
//       },
//       {
//         name: "DELETE",
//         description: "Allows deletion of a permission",
//         moduleId: permissionModule.id,
//       },
//     ];
//     // Seed Permissions
//     for (const permission of permissions) {
//       const isPermission = await db.Permission.findOne({
//         where: { name: permission.name, moduleId: permission.moduleId },
//       });
//       if (!isPermission) {
//         await db.Permission.create(permission);
//         console.log(
//           `Permission "${permission.name}" for module ${permission.moduleId} seeded successfully.`
//         );
//       } else {
//         console.log(
//           `Permission "${permission.name}" already exists, skipping seeding.`
//         );
//       }
//     }
//   } catch (error) {
//     console.error("Something went wrong ", error);
//   }
// };
// export { seedDB };
const index_1 = __importDefault(require("../models/index"));
const seedDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modules = [
            { name: "Admin Module", key: "adminModule" },
            { name: "User Module", key: "userModule" },
            { name: "Sub Admin Module", key: "subAdminModule" },
            { name: "Permission Module", key: "permissionModule" },
        ];
        // Seed Modules
        for (const module of modules) {
            const [createdModule] = yield index_1.default.Module.findOrCreate({
                where: { key: module.key },
                defaults: module,
            });
            console.log(`Module "${module.name}" processed successfully.`);
        }
        // Fetch all modules after creation
        const adminModule = yield index_1.default.Module.findOne({
            where: { key: "adminModule" },
        });
        const userModule = yield index_1.default.Module.findOne({
            where: { key: "userModule" },
        });
        const subAdminModule = yield index_1.default.Module.findOne({
            where: { key: "subAdminModule" },
        });
        const permissionModule = yield index_1.default.Module.findOne({
            where: { key: "permissionModule" },
        });
        if (!adminModule || !userModule || !subAdminModule || !permissionModule) {
            throw new Error("Required modules not found");
        }
        const permissions = [
            {
                name: "CREATE",
                description: "Allows creation of a sub admin",
                moduleId: adminModule.id,
            },
            {
                name: "READ",
                description: "Allows to view sub admin",
                moduleId: adminModule.id,
            },
            {
                name: "UPDATE",
                description: "Allows updation of a sub admin",
                moduleId: adminModule.id,
            },
            {
                name: "DELETE",
                description: "Allows deletion of a sub admin",
                moduleId: adminModule.id,
            },
            {
                name: "CREATE",
                description: "Allows creation of a user",
                moduleId: userModule.id,
            },
            {
                name: "READ",
                description: "Allows to view users",
                moduleId: userModule.id,
            },
            {
                name: "UPDATE",
                description: "Allows updation of a user",
                moduleId: userModule.id,
            },
            {
                name: "DELETE",
                description: "Allows deletion of a user",
                moduleId: userModule.id,
            },
            {
                name: "CREATE",
                description: "Allows creation of a sub admin",
                moduleId: subAdminModule.id,
            },
            {
                name: "READ",
                description: "Allows to view sub admin",
                moduleId: subAdminModule.id,
            },
            {
                name: "UPDATE",
                description: "Allows updation of a sub admin",
                moduleId: subAdminModule.id,
            },
            {
                name: "DELETE",
                description: "Allows deletion of a sub admin",
                moduleId: subAdminModule.id,
            },
            {
                name: "CREATE",
                description: "Allows creation of a permission",
                moduleId: permissionModule.id,
            },
            {
                name: "READ",
                description: "Allows to view permission",
                moduleId: permissionModule.id,
            },
            {
                name: "UPDATE",
                description: "Allows updation of a permission",
                moduleId: permissionModule.id,
            },
            {
                name: "DELETE",
                description: "Allows deletion of a permission",
                moduleId: permissionModule.id,
            },
        ];
        // Seed Permissions
        for (const permission of permissions) {
            const [createdPermission] = yield index_1.default.Permission.findOrCreate({
                where: {
                    name: permission.name,
                    moduleId: permission.moduleId,
                },
                defaults: permission,
            });
            console.log(`Permission "${permission.name}" processed successfully.`);
        }
    }
    catch (error) {
        console.error("Something went wrong ", error);
        throw error;
    }
});
exports.seedDB = seedDB;
