import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { RedisCacheAdapter } from "mikro-orm-cache-adapter-redis";
import { IS_PROD } from "./constants";
import redisClient from "./redis";
import type { MikroORM } from "@mikro-orm/core";

export default {
  dbName: "syncbase",
  password: "postgres",
  type: "postgresql",
  entitiesTs: ["./src/entities/**/*.ts"],
  entities: ["./dist/entities/**/*.js"],
  metadataProvider: TsMorphMetadataProvider,
  resultCache: {
    adapter: RedisCacheAdapter,
    expiration: 10000,
    options: {
      client: redisClient,
      debug: !IS_PROD,
    },
  },
  debug: !IS_PROD,
} as Parameters<typeof MikroORM.init>[0];
