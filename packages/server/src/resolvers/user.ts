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
class UserInput {
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
    @Arg("userInput") userInput: UserInput,
    @Ctx() { em }: Context
  ) {
    const user = em.create(User, {
      name: userInput.name,
      email: userInput.email,
      password: userInput.password,
      image: userInput.image,
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
