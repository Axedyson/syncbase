import request from "supertest";
import { redisClient } from "../../redis";
import { startServer } from "../../server";
import type { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import type { Server } from "net";

describe("User resolvers", () => {
  let server: Server;
  let orm: MikroORM<IDatabaseDriver<Connection>>;
  let agent: request.SuperAgentTest;
  let graphql: (
    agent: request.SuperAgentTest,
    query: string,
    variables?: Record<string, unknown>
  ) => request.Test;

  beforeAll(async () => {
    ({ server, orm } = await startServer());
    await orm.getSchemaGenerator().refreshDatabase();

    agent = request.agent(server);
    graphql = (agent, query, variables) =>
      agent
        .post("/graphql")
        .expect("Content-Type", /json/)
        .set("Accept", "application/json")
        .send({ query, variables });
  });

  afterAll(async () => {
    server.close();
    await redisClient.quit();
    await orm.close();
  });

  test("creating a user", () => {
    const query = /* GraphQL */ `
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

    return graphql(agent, query, variables)
      .expect(200)
      .expect(
        "set-cookie",
        /^ko=.+; Path=\/; Expires=.+; HttpOnly; SameSite=Lax$/
      )
      .then((res) => {
        expect(res.body.data.registerUser.name).toBe("Bob");
      });
  });

  test("me resolver", () => {
    const query = /* GraphQL */ `
      query Me {
        me {
          email
        }
      }
    `;

    return graphql(agent, query)
      .expect(200)
      .then((res) => {
        expect(res.body.data.me.email).toBe("anders@ewfwe.com");
      });
  });

  test("logging in a user", () => {
    const query = /* GraphQL */ `
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

    return graphql(agent, query, variables)
      .expect(200)
      .then((res) => {
        expect(res.body.data.loginUser.email).toBe("anders@ewfwe.com");
      });
  });

  test("logging user out", () => {
    const query = /* GraphQL */ `
      mutation LogoutUser {
        logoutUser
      }
    `;

    return graphql(agent, query)
      .expect(200)
      .then((res) => {
        expect(res.body.data.logoutUser).toBe(true);
      });
  });

  test("email already taken on sign up", () => {
    const query = /* GraphQL */ `
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

    return graphql(agent, query, variables)
      .expect(200)
      .then((res) => {
        expect(res.body.errors[0].message).toBe("The email has been taken!");
      });
  });
});
