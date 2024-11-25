"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePassport = void 0;
const passport_1 = __importDefault(require("passport"));
const user_1 = require("../services/user");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const initializePassport = () => {
    const opts = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("Bearer"),
        secretOrKey: process.env.JWT_SECRET,
    };
    passport_1.default.use("jwt", new JWTstrategy(opts, (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, user_1.getUserByIdFromDB)(jwt_payload.id);
            if (user) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        }
        catch (err) {
            done(err);
        }
    })));
    return passport_1.default;
};
exports.initializePassport = initializePassport;
