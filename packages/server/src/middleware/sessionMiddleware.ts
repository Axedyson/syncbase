import connectRedis from "connect-redis";
import session from "express-session";
import { IS_PROD, SESSION_COOKIE_NAME } from "../config/constants";
import { redisClient } from "../redis";

const RedisStore = connectRedis(session);

export const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient, disableTouch: true }),
  secret: process.env.SESSION_SECRET ?? "dev_secret",
  name: SESSION_COOKIE_NAME,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
    secure: IS_PROD,
    sameSite: "lax",
  },
  saveUninitialized: false,
  resave: false,
});
