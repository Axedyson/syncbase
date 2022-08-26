import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { IS_PROD, IS_TEST } from "./constants";
import type { MikroORM } from "@mikro-orm/core";

export default {
  clientUrl: process.env.DATABASE_URL,
  dbName: IS_TEST ? "syncbase_test" : IS_PROD ? undefined : "syncbase",
  password: IS_PROD ? undefined : "postgres",
  type: "postgresql",
  entities: ["./dist/entities/**/*.js"],
  entitiesTs: ["./src/entities/**/*.ts"],
  migrations: {
    path: "dist/migrations",
    pathTs: "src/migrations",
    snapshot: false,
  },
  seeder: {
    pathTs: "./src/seeders",
  },
  metadataProvider: TsMorphMetadataProvider,
  debug: !IS_PROD,
} as Parameters<typeof MikroORM.init>[0];
