import db from "../models/index";
import { ISeqUser } from "../models/user";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { verify } from "jsonwebtoken";
import { Op } from "sequelize";

const validateUser = async (user: { email: string; password: string }) => {
  const { dataValues: getUser } = await db.User.findOne({
    where: {
      email: user.email,
    },
  });

  if (getUser && getUser.password) {
    const isMatch = await bcrypt.compare(user.password, getUser.password);
    if (isMatch) {
      const { password, ...result } = getUser;
      return result;
    } else {
      throw new Error("Invalid credentials");
    }
  } else {
    throw new Error("Invalid credentials");
  }
};

const login = async (user: ISeqUser) => {
  const payload = { id: user.id, email: user.email, roleId: user.roleId }; // Include id
  const token = sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "365d",
  });
  return {
    access_token: token,
  };
};

const logout = async (token: string, userId: number) => {
  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as any;
    const expiresAt = new Date(decoded.exp * 1000);

    await db.BlacklistedToken.create({
      token,
      userId,
      expiresAt,
    });

    return true;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

// Add utility function to invalidate all tokens for a user
const invalidateAllUserTokens = async (userId: number) => {
  const activeTokens = await db.BlacklistedToken.findAll({
    where: {
      userId,
      expiresAt: {
        [Op.gt]: new Date(),
      },
    },
  });

  return activeTokens;
};

// Updated function to check if a token is blacklisted
const isTokenBlacklisted = async (token: string, userId: number) => {
  const blacklistedToken = await db.BlacklistedToken.findOne({
    where: {
      token,
      userId,
      expiresAt: {
        [Op.gt]: new Date(), // Only check non-expired tokens
      },
    },
  });
  return !!blacklistedToken;
};
export {
  login,
  validateUser,
  logout,
  isTokenBlacklisted,
  invalidateAllUserTokens,
};
