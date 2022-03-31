import { buildSchema } from "type-graphql";
import { authChecker } from "../middleware/authChecker";
import { UserResolver } from "../resolvers/UserResolver";
import { IS_PROD } from "./constants";

export const schemaConfig = buildSchema({
  resolvers: [UserResolver],
  emitSchemaFile: !IS_PROD && "schema.graphql",
  authChecker,
  authMode: "null",
});
