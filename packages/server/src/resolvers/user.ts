import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";
import type { Context } from "../types";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(@Ctx() { em }: Context) {
    return em.find(User, {});
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => Int) id: number, @Ctx() { em }: Context) {
    const user = (await em.find(User, { id }))[0];
    return user;
  }
}
