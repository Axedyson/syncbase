import { UserInputError } from "apollo-server-express";
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
  name!: string;

  @Field(() => GraphQLEmailAddress)
  @IsEmail()
  email!: string;

  @Field()
  @Length(7, 30)
  password!: string;
}

export const registerUser = async (
  { em, req }: Context,
  input: RegisterUserInput
) => {
  const hashedPassword = await argon2.hash(input.password, {
    type: argon2.argon2id,
  });
  const user = em.create(User, {
    name: input.name,
    email: input.email,
    password: hashedPassword,
  });

  try {
    await em.persistAndFlush(user);
  } catch {
    throw new UserInputError("The email has been taken!", { field: "email" });
  }

  req.session.userId = user.id;

  return user;
};
