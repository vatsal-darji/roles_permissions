import { Request, Response } from "express";
import { createUserType, updateUserType } from "../types/users";
import {
  createUserInDB,
  getAllUsersFromDB,
  updateUserFromDB,
} from "../services/user";
import generalResponse from "../helpers/generalResponse";

const createUser = async (req: Request, res: Response) => {
  try {
    const userPayload: createUserType = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
      roleId: req.body.roleId || 3,
    };

    const user = await createUserInDB(userPayload);
    return res.status(200).json({
      success: true,
      message: "user created successfully!",
      data: user,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const users = await getAllUsersFromDB(page, limit);

    return res.status(200).json({
      success: true,
      message: "users got!",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const userPayload: updateUserType = {
      id: id,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
      roleId: req.body.roleId,
    };
    const updatedUser = await updateUserFromDB(userPayload);
    res.status(200).json({
      message: "user updated",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

export { createUser, getAllUsers, updateUser };
