import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { IS_PROD, IS_TEST } from "./constants";
import type { MikroORM } from "@mikro-orm/core";

export default {
  dbName: IS_TEST ? "syncbase_test" : "syncbase",
  password: "postgres",
  type: "postgresql",
  entities: ["./dist/entities/**/*.js"],
  entitiesTs: ["./src/entities/**/*.ts"],
  metadataProvider: TsMorphMetadataProvider,
  debug: !IS_PROD,
} as Parameters<typeof MikroORM.init>[0];
