import request from "supertest";
import { redisClient } from "../../redis";
import { startServer } from "../../server";
import type { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import type { Server } from "net";

describe("User resolvers", () => {
  let server: Server;
  let orm: MikroORM<IDatabaseDriver<Connection>>;
  let graphql: (query: string) => request.Test;

  beforeAll(async () => {
    ({ server, orm } = await startServer());
    graphql = (query) => request(server).post("/graphql").send({ query });
  });

  afterAll(async () => {
    server.close();
    await redisClient.quit();
    await orm.close();
  });

  test("an example test that produces an error", () => {
    const queryData = /* GraphQL */ `
      query errorProducingGraphqlQuery {
        thisWillGenerateAnError
      }
    `;

    return graphql(queryData)
      .expect(400)
      .then((res) => {
        expect(res.body.errors[0].message).toBe("Unknown error occurred");
      });
  });
});
