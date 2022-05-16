import passport from "passport";
import {ExtractJwt, Strategy, StrategyOptions} from "passport-jwt";

const opts: StrategyOptions = <StrategyOptions>{
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
  issuer: "webshop.local",
  audience: "webshop.local"
};

passport.use(new Strategy(opts, async (payload, cb) => {
  console.log(payload);
  return cb(null, {"id": 1}, {"test": "info"})
}));
