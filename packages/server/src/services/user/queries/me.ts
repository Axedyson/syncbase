import { User } from "../../../entities/User";
import type { Context } from "src/types";

export const me = ({ em, req }: Context) => {
  return em.findOne(User, { id: req.session.userId });
};
