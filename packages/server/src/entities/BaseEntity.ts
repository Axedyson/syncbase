import {
  BaseEntity as Base,
  OptionalProps,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export abstract class BaseEntity<
  Entity extends BaseEntity<Entity, OptionalProperties>,
  OptionalProperties extends string | undefined = undefined
> extends Base<Entity, "id"> {
  [OptionalProps]?: OptionalProperties | "createdAt" | "updatedAt";

  @Field(() => ID)
  @PrimaryKey()
  readonly id!: number;

  @Property()
  readonly createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  readonly updatedAt = new Date();
}
