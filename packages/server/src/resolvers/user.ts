import { IsEmail, Length } from "class-validator";
import {
  Arg,
  Ctx,
  Field,
  ID,
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
  @Length(3, 20)
  name!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(7, 30)
  password!: string;

  @Field()
  image!: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async registerUser(
    @Arg("input") input: RegisterUserInput,
    @Ctx() { em }: Context
  ) {
    const user = em.create(User, {
      name: input.name,
      email: input.email,
      password: input.password,
      image: input.image,
    });
    await em.persistAndFlush(user);
    return user;
  }

  @Query(() => User, { nullable: true })
  user(@Arg("id", () => ID) id: number, @Ctx() { em }: Context) {
    return em.findOne(User, { id });
  }

  @Query(() => [User])
  users(@Ctx() { em }: Context) {
    return em.find(User, {});
  }
}
