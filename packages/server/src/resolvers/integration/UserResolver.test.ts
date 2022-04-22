import request from "supertest";
import { redisClient } from "../../redis";
import { startServer } from "../../server";
import type { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import type { Server } from "net";

describe("User resolvers", () => {
  let server: Server;
  let orm: MikroORM<IDatabaseDriver<Connection>>;
  let graphql: (
    query: string,
    variables: Record<string, unknown>
  ) => request.Test;

  beforeAll(async () => {
    ({ server, orm } = await startServer());
    await orm.getSchemaGenerator().refreshDatabase();
    graphql = (query, variables) =>
      request(server)
        .post("/graphql")
        .send({ query, variables })
        .set("Accept", "application/json");
  });

  afterAll(async () => {
    server.close();
    await redisClient.quit();
    await orm.close();
  });

  test("creating a user", async () => {
    const queryData = /* GraphQL */ `
      mutation RegisterUser($userInput: RegisterUserInput!) {
        registerUser(input: $userInput) {
          name
        }
      }
    `;

    const variables = {
      userInput: {
        name: "Bob",
        email: "anders@ewfwe.com",
        password: "1234567",
      },
    };

    await graphql(queryData, variables)
      .expect(200)
      .then((res) => {
        expect(res.body.data.registerUser.name).toBe("Bob");
      });
  });

  test("logging in a user", () => {
    const queryData = /* GraphQL */ `
      mutation LoginUser($userInput: LoginUserInput!) {
        loginUser(input: $userInput) {
          email
        }
      }
    `;

    const variables = {
      userInput: {
        email: "anders@ewfwe.com",
        password: "1234567",
      },
    };

    return graphql(queryData, variables)
      .expect(200)
      .then((res) => {
        expect(res.body.data.loginUser.email).toBe("anders@ewfwe.com");
      });
  });

  test("email already taken on sign up", () => {
    const queryData = /* GraphQL */ `
      mutation RegisterUser($userInput: RegisterUserInput!) {
        registerUser(input: $userInput) {
          name
        }
      }
    `;

    const variables = {
      userInput: {
        name: "Bob",
        email: "anders@ewfwe.com",
        password: "1234567",
      },
    };

    return graphql(queryData, variables)
      .expect(200)
      .then((res) => {
        expect(res.body.errors[0].message).toBe("The email has been taken!");
      });
  });
});
