import { User } from "../../../entities/User";
import type { Context } from "src/types";

export const users = ({ em }: Context) => {
  return em.find(User, {});
};
