import { authMiddleware } from "../middleware/authMiddleware";
import { UserResolver } from "../resolvers/UserResolver";
import { IS_PROD } from "./constants";
import type { BuildSchemaOptions } from "type-graphql";

export const schemaConfig: BuildSchemaOptions = {
  resolvers: [UserResolver],
  emitSchemaFile: !IS_PROD && "schema.graphql",
  authChecker: authMiddleware,
  authMode: "null",
};
