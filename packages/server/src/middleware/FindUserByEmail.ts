import { UserInputError } from "apollo-server-express";
import { createParamDecorator } from "type-graphql";
import { User } from "../entities/User";
import type { Context } from "../types";

export const FindUserByEmail = () => {
  return createParamDecorator<Context>(async ({ context, args }) => {
    const user = await context.em.findOne(User, {
      email: args.input.email,
    });

    if (!user)
      throw new UserInputError(
        "Couldn't find a user with that email or password lool",
        { field: "email" }
      );

    return user;
  });
};
