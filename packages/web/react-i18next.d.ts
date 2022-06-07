import "react-i18next";
import type common from "./locales/en/common.json";
import type error from "./locales/en/error.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof common;
      error: typeof error;
    };
  }
}
