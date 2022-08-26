import connectRedis from "connect-redis";
import session from "express-session";
import { IS_PROD, SESSION_COOKIE_NAME } from "../config/constants";
import { redisClient } from "../redis";
import type { RequestHandler } from "express-serve-static-core";

const RedisStore = connectRedis(session);

export const sessionMiddleware: RequestHandler = session({
  store: new RedisStore({ client: redisClient, disableTouch: true }),
  secret: process.env.SESSION_SECRET || "dev_secret",
  name: SESSION_COOKIE_NAME,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
    secure: IS_PROD,
    sameSite: "lax",
    domain: IS_PROD ? "syncbase.tv" : undefined,
  },
  saveUninitialized: false,
  resave: false,
});
