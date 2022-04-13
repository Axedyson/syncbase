import type { Context } from "src/types";
import type { AuthChecker } from "type-graphql";

export const authMiddleware: AuthChecker<Context> = ({ context }) => {
  return !!context.req.session.userId;
};
