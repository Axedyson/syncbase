import { Entity, Property, Unique } from "@mikro-orm/core";
import { GraphQLEmailAddress } from "graphql-scalars";
import { nanoid } from "nanoid";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity } from "./BaseEntity";

@ObjectType()
@Entity()
export class User extends BaseEntity<User, "channelId"> {
  @Field()
  @Property()
  name!: string;

  @Field(() => GraphQLEmailAddress)
  @Property()
  @Unique()
  email!: string;

  @Property()
  password!: string;

  @Field(() => ID)
  @Property()
  @Unique()
  readonly channelId = nanoid();
}
