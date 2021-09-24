import { MikroORM } from "@mikro-orm/core";

const main = async () => {
  const orm = await MikroORM.init({
    entities: [],
    dbName: "syncbase",
    type: "postgresql",
  });

  console.log(orm.em);
};

main();
