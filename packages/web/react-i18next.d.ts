import "react-i18next";
import type auth from "./locales/en/auth.json";
import type common from "./locales/en/common.json";
import type user from "./locales/en/user.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      auth: typeof auth;
      user: typeof user;
      common: typeof common;
    };
  }
}
