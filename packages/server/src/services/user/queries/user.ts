import { User } from "../../../entities/User";
import type { Context } from "src/types";

export const user = ({ em }: Context, channelId: string) => {
  console.log("lol");
  return em.findOne(User, { channelId });
};
