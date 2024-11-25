import { Request, Response, NextFunction } from "express";
import db from "../models/index";
import passport from "passport";
import { ISeqUser } from "../models/user";
import { isTokenBlacklisted } from "../services/auth";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (err: any, user: ISeqUser | undefined, info: any) => {
      if (err) {
        return next(err);
      }
      const token = req.headers.authorization?.split(" ")[1];

      if (!user) {
        return res.status(401).json({
          message: "User does not exist",
          success: true,
        });
      } else {
        if (token) {
          // Check if token is blacklisted
          const isBlacklisted = await isTokenBlacklisted(token, user.id);
          if (isBlacklisted) {
            return res.status(401).json({
              message: "Token is invalid",
              success: false,
            });
          }
        }
        req.user = user;

        return next();
      }
    }
  )(req, res, next);
};
