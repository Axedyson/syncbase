import "reflect-metadata";
import http from "http";
import { MikroORM } from "@mikro-orm/core";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { IS_PROD, IS_TEST } from "./config/constants";
import { schemaConfig } from "./config/typegraphql";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { sessionMiddleware } from "./middleware/sessionMiddleware";
import type { Context } from "./types";

export const startServer = async () => {
  const orm = await MikroORM.init();

  const app = express();
  app.disable("x-powered-by");

  app.use(sessionMiddleware);

  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    schema: await buildSchema(schemaConfig),
    context: ({ req, res }): Context => ({
      req,
      res,
      em: orm.em.fork(),
    }),
    formatError: errorMiddleware,
    csrfPrevention: true,
    // cache: "bounded",
    plugins: [
      IS_PROD
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: "http://localhost:3000",
    },
  });

  const PORT = IS_TEST ? 8082 : 8080;

  await new Promise<void>((resolve) => httpServer.listen(PORT, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );

  return { server: httpServer, orm };
};
