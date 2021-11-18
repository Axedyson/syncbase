import { BaseEntity as Base, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export abstract class BaseEntity<T extends BaseEntity<T>> extends Base<
  T,
  "id"
> {
  @Field(() => ID)
  @PrimaryKey()
  readonly id!: number;

  @Property()
  readonly createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  readonly updatedAt = new Date();
}
