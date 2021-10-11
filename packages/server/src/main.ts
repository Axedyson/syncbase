import "reflect-metadata";
import http from "http";
import { MikroORM } from "@mikro-orm/core";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { PORT } from "./config/constants";
import { UserResolver } from "./resolvers/user";
import type { Context } from "./types";

(async () => {
  const orm = await MikroORM.init();
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }): Context => ({ req, res, em: orm.em.fork() }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
})().catch(console.error);
