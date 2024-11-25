import db from "../models/index";

const seedRolePermissions = async () => {
  try {
    const rolePermissions = [
      {
        roleName: "Admin",
        permissions: [
          { name: "CREATE", moduleKey: "subAdminModule" },
          { name: "READ", moduleKey: "subAdminModule" },
          { name: "UPDATE", moduleKey: "subAdminModule" },
          { name: "DELETE", moduleKey: "subAdminModule" },
          { name: "CREATE", moduleKey: "userModule" },
          { name: "READ", moduleKey: "userModule" },
          { name: "UPDATE", moduleKey: "userModule" },
          { name: "DELETE", moduleKey: "userModule" },
          { name: "CREATE", moduleKey: "permissionModule" },
          { name: "READ", moduleKey: "permissionModule" },
          { name: "UPDATE", moduleKey: "permissionModule" },
          { name: "DELETE", moduleKey: "permissionModule" },
        ],
      },
      {
        roleName: "Sub-Admin",
        permissions: [
          { name: "CREATE", moduleKey: "userModule" },
          { name: "READ", moduleKey: "userModule" },
          { name: "UPDATE", moduleKey: "userModule" },
          { name: "DELETE", moduleKey: "userModule" },
          { name: "READ", moduleKey: "subAdminModule" },
          { name: "CREATE", moduleKey: "permissionModule" },
          { name: "READ", moduleKey: "permissionModule" },
          { name: "UPDATE", moduleKey: "permissionModule" },
          { name: "DELETE", moduleKey: "permissionModule" },
        ],
      },
      {
        roleName: "User",
        permissions: [{ name: "READ", moduleKey: "userModule" }],
      },
    ];

    for (const rolePerm of rolePermissions) {
      // Find the role by name
      const role = await db.Role.findOne({
        where: { name: rolePerm.roleName },
      });
      if (!role) {
        console.error(`Role "${rolePerm.roleName}" not found.`);
        continue;
      }
      for (const permObj of rolePerm.permissions) {
        const { name, moduleKey } = permObj;

        // Find the module and permission by moduleKey and permission name
        const module = await db.Module.findOne({ where: { key: moduleKey } });
        if (!module) {
          console.error(`Module "${moduleKey}" not found.`);
          continue;
        }

        const permission = await db.Permission.findOne({
          where: { name, moduleId: module.id },
        });

        if (!permission) {
          console.error(
            `Permission "${name}" not found for module "${moduleKey}".`
          );
          continue;
        }

        // Check if the role-permission association already exists
        const rolePermission = await db.RolePermission.findOne({
          where: { roleId: role.id, permissionId: permission.id },
        });

        // If the association doesn't exist, create it
        if (!rolePermission) {
          await db.RolePermission.create({
            roleId: role.id,
            permissionId: permission.id,
            moduleId: module.id,
          });
          console.log(
            `Assigned permission "${name}" to role "${rolePerm.roleName}".`
          );
        } else {
          console.log(
            `Permission "${name}" already assigned to role "${rolePerm.roleName}". Skipping.`
          );
        }
      }
    }
  } catch (error) {
    console.error("Error during role-permission seeding:", error);
  }
};

export { seedRolePermissions };
