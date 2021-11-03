import argon2 from "argon2";
import { IsEmail, Length } from "class-validator";
import { GraphQLEmailAddress, GraphQLURL } from "graphql-scalars";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entities/User";
import type { Context } from "../types";

@InputType()
class RegisterUserInput {
  @Field()
  @Length(3, 15)
  name!: string;

  @Field(() => GraphQLEmailAddress)
  @IsEmail()
  email!: string;

  @Field()
  @Length(7, 30)
  password!: string;

  @Field(() => GraphQLURL)
  image!: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async RegisterUser(
    @Arg("input") input: RegisterUserInput,
    @Ctx() { em }: Context
  ) {
    const hashedPassword = await argon2.hash(input.password, {
      type: argon2.argon2id,
    });
    const user = em.create(User, {
      name: input.name,
      email: input.email,
      password: hashedPassword,
      image: input.image,
    });
    await em.persistAndFlush(user);
    return user;
  }

  @Query(() => [User])
  users(@Ctx() { em }: Context) {
    return em.find(User, {});
  }
}
