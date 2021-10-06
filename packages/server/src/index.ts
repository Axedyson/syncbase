import { MikroORM } from "@mikro-orm/core";
import { User } from "./entities/User";

const main = async () => {
  const orm = await MikroORM.init();
  const user = orm.em.create(User, { name: "lool", email: "afewf@lool.com" });
  await orm.em.persistAndFlush(user);
};

main().catch(console.error);
