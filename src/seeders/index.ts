// // index.ts
import { seedDB } from "./permissionSeeder";
import { seedRolePermissions } from "./rolePermissionSeeder";

const runSeeder = async () => {
  try {
    await seedDB();
    await seedRolePermissions();
    console.log("Database seeding completed.");
  } catch (error) {
    console.error("Error running seeder:", error);
  }
};

runSeeder();
