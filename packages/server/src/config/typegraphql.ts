import { buildSchema } from "type-graphql";
import { authMiddleware } from "../middleware/authMiddleware";
import { UserResolver } from "../resolvers/UserResolver";
import { IS_PROD } from "./constants";

export const schemaConfig = buildSchema({
  resolvers: [UserResolver],
  emitSchemaFile: !IS_PROD && "schema.graphql",
  authChecker: authMiddleware,
  authMode: "null",
});
