import { graphql } from "./testSetup";

const variables = {
  userInput: {
    name: "Bob",
    email: "anders@ewfwe.com",
    password: "1234567",
  },
};

describe("User resolvers", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test("creating a user", async () => {
    const query = /* GraphQL */ `
      mutation RegisterUser($userInput: RegisterUserInput!) {
        registerUser(input: $userInput) {
          name
        }
      }
    `;

    return graphql({ query, variables })
      .expect(
        "set-cookie",
        /^ko=.+; Path=\/; Expires=.+; HttpOnly; SameSite=Lax$/
      )
      .then((res) => {
        expect(res.body.data.registerUser.name).toBe("Bob");
      });
  });

  test("me resolver", async () => {
    const query = /* GraphQL */ `
      query Me {
        me {
          email
        }
      }
    `;

    return graphql({ query }).then((res) => {
      expect(res.body.data.me.email).toBe("anders@ewfwe.com");
    });
  });

  test("logging in a user", async () => {
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

    return graphql({ query, variables }).then((res) => {
      expect(res.body.data.loginUser.email).toBe("anders@ewfwe.com");
    });
  });

  test("logging user out", async () => {
    const query = /* GraphQL */ `
      mutation LogoutUser {
        logoutUser
      }
    `;

    return graphql({ query }).then((res) => {
      expect(res.body.data.logoutUser).toBe(true);
    });
  });

  test("email already taken on sign up", async () => {
    const query = /* GraphQL */ `
      mutation RegisterUser($userInput: RegisterUserInput!) {
        registerUser(input: $userInput) {
          name
        }
      }
    `;

    return graphql({ query, variables }).then((res) => {
      expect(res.body.errors[0].message).toBe("auth:emailTaken");
    });
  });
});
