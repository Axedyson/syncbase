import "reflect-metadata";
import http from "http";
import { MikroORM } from "@mikro-orm/core";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
import { IS_PROD, PORT } from "./config/constants";
import { UserResolver } from "./resolvers/user";
import type { Context } from "./types";

(async () => {
  const orm = await MikroORM.init();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = new Redis();

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      name: "qid",
      saveUninitialized: false,
      secret: "keyboard cat",
      resave: false,
      cookie: {
        httpOnly: true,
        sameSite: "strict",
        secure: IS_PROD,
      },
    })
  );

  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }): Context => ({ req, res, em: orm.em.fork() }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({}),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
})().catch(console.error);
