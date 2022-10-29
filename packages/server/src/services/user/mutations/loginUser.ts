import { UserInputError } from "apollo-server-errors";
import argon2 from "argon2";
import { IsEmail, Length } from "class-validator";
import { GraphQLEmailAddress } from "graphql-scalars";
import { Field, InputType } from "type-graphql";
import type { User } from "../../../entities/User";
import type { Context } from "src/types";

@InputType()
export class LoginUserInput {
  @Field(() => GraphQLEmailAddress)
  @IsEmail()
  readonly email!: string;

  @Field()
  @Length(7, 30)
  readonly password!: string;
}

export const loginUser = async (
  { req }: Context,
  input: LoginUserInput,
  user: User
) => {
  const match = await argon2.verify(user.password, input.password, {
    type: argon2.argon2id,
  });
  if (!match) {
    throw new UserInputError("auth:invalidLogin", {
      field: "email",
    });
  }

  req.session.userId = user.id;

  return user;
};
