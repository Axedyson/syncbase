import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { IS_PROD, IS_TEST } from "./constants";
import type { MikroORM } from "@mikro-orm/core";

const prodOrmConfig = {
  clientUrl: process.env.DATABASE_URL,
  dbName: undefined,
  password: undefined,
  debug: false,
};

const testOrmConfig = {
  dbName: "syncbase_test",
};

export default {
  dbName: "syncbase",
  password: "postgres",
  type: "postgresql",
  entities: ["./dist/entities"],
  entitiesTs: ["./src/entities"],
  migrations: {
    path: "dist/migrations",
    pathTs: "src/migrations",
    snapshot: false,
  },
  seeder: {
    pathTs: "./src/seeders",
  },
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  ...(IS_TEST && testOrmConfig),
  ...(IS_PROD && prodOrmConfig),
} as Parameters<typeof MikroORM.init>[0];
