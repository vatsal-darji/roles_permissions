import { Request, Response } from "express";
// import { login } from "../services/user";
import generalResponse from "../helpers/generalResponse";
import {
  invalidateAllUserTokens,
  login,
  logout,
  validateUser,
} from "../services/auth";
import { ISeqUser } from "../models/user";

const loginUser = async (req: Request, res: Response) => {
  try {
    const bodyData = req.body;
    const user = await validateUser({
      email: bodyData.email,
      password: bodyData.password,
    });
    const token = (await login(user)).access_token;

    return res.status(200).json({
      success: true,
      message: "user logged in successfully!",
      data: { token, ...user },
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

const logoutUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const userId = (req.user as ISeqUser).id;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token provided",
        data: null,
      });
    }

    await logout(token, userId);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
      data: null,
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

const logoutAllDevices = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as ISeqUser).id;
    const activeTokens = await invalidateAllUserTokens(userId);

    return res.status(200).json({
      success: true,
      message: "Logged out from all devices successfully",
      data: {
        sessionsTerminated: activeTokens.length,
      },
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

export { loginUser, logoutUser, logoutAllDevices };
