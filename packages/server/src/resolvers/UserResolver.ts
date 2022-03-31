import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import {
  LoginUserInput,
  loginUser,
} from "../services/user/mutations/loginUser";
import { logoutUser } from "../services/user/mutations/logoutUser";
import {
  RegisterUserInput,
  registerUser,
} from "../services/user/mutations/registerUser";
import { me } from "../services/user/queries/me";
import { Context } from "../types";

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    return me(ctx);
  }

  @Mutation(() => User)
  async loginUser(
    @Arg("input") input: LoginUserInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    return loginUser(ctx, input);
  }

  @Mutation(() => User)
  async registerUser(
    @Arg("input") input: RegisterUserInput,
    @Ctx() ctx: Context
  ) {
    return registerUser(ctx, input);
  }

  @Mutation(() => Boolean)
  async logoutUser(@Ctx() ctx: Context) {
    return logoutUser(ctx);
  }
}
