import type { Context } from "src/types";
import type { AuthChecker } from "type-graphql";

export const authChecker: AuthChecker<Context> = ({ context }) => {
  return !!context.userId;
};
