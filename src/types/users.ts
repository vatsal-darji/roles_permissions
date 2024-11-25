export type createUserType = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  roleId: number;
  createdAt?: string;
  updatedAt?: string;
};

export type updateUserType = {
  id: number;
  fname: string;
  lname: string;
  email: string;
  password: string;
  roleId: number;
  createdAt?: string;
  updatedAt?: string;
};
