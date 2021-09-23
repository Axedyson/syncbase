import { MikroORM } from "@mikro-orm/core";
import { PROD } from "./constants";

const main = async () => {
  const orm = await MikroORM.init({
    entities: [],
    dbName: "syncbase",
    type: "postgresql",
  });

  console.log(orm.em);
  console.log(PROD);
};

main();
