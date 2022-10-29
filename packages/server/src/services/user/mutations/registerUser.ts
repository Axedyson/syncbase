import { UserInputError } from "apollo-server-errors";
import argon2 from "argon2";
import { IsEmail, Length } from "class-validator";
import { GraphQLEmailAddress } from "graphql-scalars";
import { Field, InputType } from "type-graphql";
import { User } from "../../../entities/User";
import type { Context } from "src/types";

@InputType()
export class RegisterUserInput {
  @Field()
  @Length(3, 15)
  readonly name!: string;

  @Field(() => GraphQLEmailAddress)
  @IsEmail()
  readonly email!: string;

  @Field()
  @Length(7, 30)
  readonly password!: string;
}

export const registerUser = async (
  { em, req }: Context,
  input: RegisterUserInput
) => {
  const user = await em.findOne(User, {
    email: input.email,
  });

  if (user) {
    throw new UserInputError("auth:emailTaken", { field: "email" });
  }

  const hashedPassword = await argon2.hash(input.password, {
    type: argon2.argon2id,
  });
  const newUser = em.create(User, {
    name: input.name,
    email: input.email,
    password: hashedPassword,
  });

  await em.persistAndFlush(newUser);

  req.session.userId = newUser.id;

  return newUser;
};
