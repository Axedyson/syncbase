import { UserInputError } from "apollo-server-express";
import argon2 from "argon2";
import { Length } from "class-validator";
import { GraphQLEmailAddress } from "graphql-scalars";
import { Field, InputType } from "type-graphql";
import { User } from "../../entities/User";
import type { Context } from "src/types";

@InputType()
export class LoginUserInput {
  @Field(() => GraphQLEmailAddress)
  email!: string;

  @Field()
  @Length(7, 30)
  password!: string;
}

export const loginUser = async (
  { em, req }: Context,
  input: LoginUserInput
) => {
  const notFoundMsg = "Coudn't find a user with that email or password";
  const user = await em.findOne(User, { email: input.email.toLowerCase() });

  if (!user) throw new UserInputError(notFoundMsg, { field: "email" });

  const match = await argon2.verify(user.password, input.password, {
    type: argon2.argon2id,
  });
  if (!match) throw new UserInputError(notFoundMsg, { field: "email" });

  req.session.userId = user.id;

  return user;
};
