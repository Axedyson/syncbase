import { MikroORM } from "@mikro-orm/core";
import { IS_PROD } from "./config/constants";
import { User } from "./entities/User";

const main = async () => {
  const orm = await MikroORM.init();
  const user = orm.em.create(User, { name: "lool", email: "afewf@lool.com" });
  await orm.em.persistAndFlush(user);
  console.log(IS_PROD);
};

main().catch(console.error);
