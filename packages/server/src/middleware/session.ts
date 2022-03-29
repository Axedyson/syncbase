import connectRedis from "connect-redis";
import session from "express-session";
import Redis from "ioredis";
import { IS_PROD, SESSION_NAME } from "../config/constants";

const RedisStore = connectRedis(session);
const redisClient = new Redis();

export const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: IS_PROD ? process.env.SESSION_SECRET : "dev_secret",
  name: SESSION_NAME,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    secure: IS_PROD,
    sameSite: "lax",
  },
  saveUninitialized: false,
  resave: false,
});
