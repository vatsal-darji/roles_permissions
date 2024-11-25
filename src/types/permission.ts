export type createPermissionType = {
  name: string;
  description: string;
  moduleId: number;
  createdAt?: string;
  updatedAt?: string;
};

export type updatePermissionType = {
  id: number;
  name: string;
  description: string;
  moduleId: number;
  createdAt?: string;
  updatedAt?: string;
};
