import { Entity, Property, Unique } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity } from "./BaseEntity";

@ObjectType()
@Entity()
export class User extends BaseEntity<User> {
  @Field()
  @Property()
  name!: string;

  @Field()
  @Property()
  @Unique()
  email!: string;

  @Property()
  password!: string;

  @Field()
  @Property()
  image!: string;
}
