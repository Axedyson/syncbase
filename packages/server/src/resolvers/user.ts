import argon2 from "argon2";
import { IsEmail, Length } from "class-validator";
import { GraphQLEmailAddress } from "graphql-scalars";
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
import { Context } from "../types";

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
    });
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // TODO: This needs to be a lot better!
    try {
      await em.persistAndFlush(user);
    } catch {
      throw new Error("the email has been taken!!!");
    }
    return user;
  }

  @Query(() => [User])
  users(@Ctx() { em }: Context) {
    return em.find(User, {});
  }
}
