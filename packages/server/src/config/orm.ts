import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { IS_PROD } from "./constants";
import type { MikroORM } from "@mikro-orm/core";
// import type { PostgreSqlDriver } from "@mikro-orm/postgresql";

export default {
  dbName: "syncbase",
  password: "postgres",
  type: "postgresql",
  entities: ["./dist/entities/**/*.js"],
  entitiesTs: ["./src/entities/**/*.ts"],
  metadataProvider: TsMorphMetadataProvider,
  debug: !IS_PROD,
} as Parameters<typeof MikroORM.init>[0];
