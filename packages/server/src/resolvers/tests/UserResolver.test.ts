import { connect, disconnect, graphql } from "./testSetup";

describe("User resolvers", () => {
  beforeAll(connect);
  afterAll(disconnect);

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

    return graphql({ query, variables })
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

    return graphql({ query })
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

    return graphql({ query, variables })
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

    return graphql({ query })
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

    return graphql({ query, variables })
      .expect(200)
      .then((res) => {
        expect(res.body.errors[0].message).toBe("The email has been taken!");
      });
  });
});