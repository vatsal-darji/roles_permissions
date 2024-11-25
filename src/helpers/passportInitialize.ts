import passport from "passport";
import { getUserByIdFromDB } from "../services/user";
import { IJwtPayload } from "../types/authentication";
import { stringify } from "querystring";
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

export const initializePassport = () => {
  const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("Bearer"),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    "jwt",
    new JWTstrategy(opts, async (jwt_payload: IJwtPayload, done: any) => {
      try {
        const user = await getUserByIdFromDB(jwt_payload.id);

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        done(err);
      }
    })
  );
  return passport;
};
