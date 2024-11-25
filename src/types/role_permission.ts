export type createRolePermissionType = {
  roleId: number;
  permissionId: number;
  moduleId: number;
  createdAt?: string;
  updatedAt?: string;
};

export type updateRolePermissionType = {
  roleId: number;
  permissionId: number;
  moduleId: number;
  createdAt?: string;
  updatedAt?: string;
};

export type deleteRolePermissionType = {
  roleId: number;
  permissionId: number;
  moduleId: number;
};
