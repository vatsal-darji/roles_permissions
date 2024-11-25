// import db from "../models/index";

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

import db from "../models/index";

const seedDB = async () => {
  try {
    const modules = [
      { name: "Admin Module", key: "adminModule" },
      { name: "User Module", key: "userModule" },
      { name: "Sub Admin Module", key: "subAdminModule" },
      { name: "Permission Module", key: "permissionModule" },
    ];

    // Seed Modules
    for (const module of modules) {
      const [createdModule] = await db.Module.findOrCreate({
        where: { key: module.key },
        defaults: module,
      });
      console.log(`Module "${module.name}" processed successfully.`);
    }

    // Fetch all modules after creation
    const adminModule = await db.Module.findOne({
      where: { key: "adminModule" },
    });
    const userModule = await db.Module.findOne({
      where: { key: "userModule" },
    });
    const subAdminModule = await db.Module.findOne({
      where: { key: "subAdminModule" },
    });
    const permissionModule = await db.Module.findOne({
      where: { key: "permissionModule" },
    });

    if (!adminModule || !userModule || !subAdminModule || !permissionModule) {
      throw new Error("Required modules not found");
    }

    const permissions: any = [
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
      const [createdPermission] = await db.Permission.findOrCreate({
        where: {
          name: permission.name,
          moduleId: permission.moduleId,
        },
        defaults: permission,
      });
      console.log(`Permission "${permission.name}" processed successfully.`);
    }
  } catch (error) {
    console.error("Something went wrong ", error);
    throw error;
  }
};

export { seedDB };
