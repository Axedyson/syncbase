import { SESSION_COOKIE_NAME } from "../../../config/constants";
import type { Context } from "src/types";

export const logoutUser = ({ req, res }: Context) => {
  return new Promise<boolean>((resolve) =>
    req.session.destroy((err) => {
      res.clearCookie(SESSION_COOKIE_NAME);
      if (err) {
        console.error(err);
        resolve(false);
      } else resolve(true);
    })
  );
};
