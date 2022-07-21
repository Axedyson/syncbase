import { UserInputError } from "apollo-server-errors";
import { createParamDecorator } from "type-graphql";
import { User } from "../entities/User";
import type { Context } from "../types";

export const FindUserByEmail = () => {
  return createParamDecorator<Context>(async ({ context, args }) => {
    const user = await context.em.findOne(User, {
      email: args.input.email,
    });

    if (!user)
      throw new UserInputError("auth:invalidLogin", {
        field: "email",
      });

    return user;
  });
};
