import request from "supertest";
import { redisClient } from "../../redis";
import { DatabaseSeeder } from "../../seeders/DatabaseSeeder";
import { startServer } from "../../server";
import type { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import type { Server } from "net";

type graphqlTestFunc = ({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}) => request.Test;

let server: Server;
let orm: MikroORM<IDatabaseDriver<Connection>>;

export let graphql: graphqlTestFunc;

beforeAll(async () => {
  ({ server, orm } = await startServer());
  await orm.getSchemaGenerator().refreshDatabase();
  await orm.getSeeder().seed(DatabaseSeeder);

  const agent = request.agent(server);

  graphql = (data) =>
    agent
      .post("/graphql")
      .set("Accept", "application/json")
      .send(data)
      .expect(200)
      .expect("Content-Type", /json/);
});

afterAll(async () => {
  await redisClient.quit();
  await orm.close();
  await new Promise((resolve) => server.close(resolve));
});
