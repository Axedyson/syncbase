import request from "supertest";
import { redisClient } from "../redis";
import { startServer } from "../server";
import type { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import type { Server } from "net";

describe("user resolvers", () => {
  let server: Server;
  let orm: MikroORM<IDatabaseDriver<Connection>>;

  beforeAll(async () => {
    ({ server, orm } = await startServer());
  });

  afterAll(async () => {
    // const lol: string = 2;
    // console.log(lol);
    server.close();
    await redisClient.quit();
    await orm.close();
  });

  it("says hello", () => {
    const queryData = {
      query: `query Lol {
        lol
      }`,
    };

    return request(server)
      .post("/graphql")
      .send(queryData)
      .then((res) => {
        expect(res.body.data.lol).toBe("lol");
      });
  });

  it("lol", () => {
    const queryData = {
      query: `query Lol {
        lol
      }`,
    };

    return request(server)
      .post("/graphql")
      .send(queryData)
      .then((res) => {
        expect(res.body.data.lol).toBe("lol");
      });
  });
});
