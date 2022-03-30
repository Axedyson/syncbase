import { UserInputError } from "apollo-server-express";
import argon2 from "argon2";
import { IsEmail, Length } from "class-validator";
import { GraphQLEmailAddress } from "graphql-scalars";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { SESSION_NAME } from "../config/constants";
import { User } from "../entities/User";
import { LoginUserInput, loginUser } from "../services/user/loginUser";
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
  async registerUser(
    @Arg("input") input: RegisterUserInput,
    @Ctx() { em, req }: Context
  ) {
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
  }

  @Mutation(() => User)
  async loginUser(
    @Arg("input") input: LoginUserInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    return loginUser(ctx, input);
  }

  @Mutation(() => Boolean)
  async logoutUser(@Ctx() { req, res }: Context) {
    let success = false;

    res.clearCookie(SESSION_NAME);
    req.session.destroy((err) => {
      success = !err;
    });

    return success;
  }

  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, req }: Context): Promise<User | null> {
    const userId = req.session.userId;

    if (!userId) return null;

    return em.findOne(User, { id: userId });
  }
}
