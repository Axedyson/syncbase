import "reflect-metadata";
import http from "http";
import { MikroORM } from "@mikro-orm/core";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { IS_PROD, PORT } from "./config/constants";
import { schemaConfig } from "./config/typegraphql";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { sessionMiddleware } from "./middleware/sessionMiddleware";
import type { Context } from "./types";

(async () => {
  const orm = await MikroORM.init();

  const app = express();
  app.disable("x-powered-by");

  app.use(sessionMiddleware);

  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    schema: await schemaConfig,
    context: ({ req, res }): Context => ({
      req,
      res,
      em: orm.em.fork(),
      userId: req.session.userId,
    }),
    formatError: errorMiddleware,
    // We are using the retired graphql playground to test our graphql endpoint for now.
    // The reason is that apollo studio 3 (default tool) requires cookies to
    // have the following settings: secure: true & sameSite: "none".
    // But express-session currently doesn't allow setting secure cookies from a http site
    // To fix this issue we could do what is stated here:
    // https://github.com/apollographql/apollo-server/issues/5775
    // and there are probably also some other workarounds (reverse proxy using https etc.)
    // but we don't like nasty workarounds here!
    // I think the best solution is probably to wait for the following issue to be solved:
    // https://github.com/expressjs/session/issues/837
    plugins: [
      IS_PROD
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground({
            settings: { "request.credentials": "same-origin" },
          }),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: { credentials: true, origin: "http://localhost:3000" },
  });

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
})().catch(console.error);
