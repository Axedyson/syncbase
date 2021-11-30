import { BaseEntity as Base, PrimaryKey, Property } from "@mikro-orm/core";

export abstract class BaseEntity<T extends BaseEntity<T>> extends Base<
  T,
  "id"
> {
  @PrimaryKey()
  readonly id!: number;

  @Property()
  readonly createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  readonly updatedAt = new Date();
}
