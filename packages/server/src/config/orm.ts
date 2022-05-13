import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { IS_PROD, IS_TEST } from "./constants";
import type { MikroORM } from "@mikro-orm/core";

export default {
  dbName: process.env.usePlaywrightDB
    ? "syncbase_playwright"
    : IS_TEST
    ? "syncbase_jest"
    : "syncbase",
  password: "postgres",
  type: "postgresql",
  entities: ["./dist/entities/**/*.js"],
  entitiesTs: ["./src/entities/**/*.ts"],
  seeder: {
    path: "./dist/seeders",
    pathTs: "./src/seeders",
  },
  metadataProvider: TsMorphMetadataProvider,
  debug: !IS_PROD,
} as Parameters<typeof MikroORM.init>[0];
