import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { FindUserByEmail } from "../middleware/FindUserByEmail";
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
  me(@Ctx() ctx: Context): Promise<User | null> {
    return me(ctx);
  }

  @Mutation(() => User)
  loginUser(
    @Arg("input") input: LoginUserInput,
    @Ctx() ctx: Context,
    @FindUserByEmail() user: User
  ): Promise<User> {
    return loginUser(ctx, input, user);
  }

  @Mutation(() => User)
  registerUser(@Arg("input") input: RegisterUserInput, @Ctx() ctx: Context) {
    return registerUser(ctx, input);
  }

  @Mutation(() => Boolean)
  logoutUser(@Ctx() ctx: Context) {
    return logoutUser(ctx);
  }
}
