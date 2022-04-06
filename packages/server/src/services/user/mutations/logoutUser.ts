import { SESSION_NAME } from "../../../config/constants";
import type { Context } from "src/types";

export const logoutUser = ({ req, res }: Context) => {
  let success = false;

  res.clearCookie(SESSION_NAME);
  req.session.destroy((err) => {
    success = !err;
  });

  return success;
};
