import { Entity, Property, Unique } from "@mikro-orm/core";
import { GraphQLEmailAddress } from "graphql-scalars";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity } from "./BaseEntity";

@ObjectType()
@Entity()
export class User extends BaseEntity<User> {
  @Field()
  @Property()
  name!: string;

  @Field(() => GraphQLEmailAddress)
  @Property()
  @Unique()
  email!: string;

  @Property()
  password!: string;
}
