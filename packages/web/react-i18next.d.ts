import "react-i18next";
import type common from "./locales/en/common.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    // TODO: Is this really needed?
    defaultNS: "common";
    // TODO: Check if this is really needed!
    resources: {
      common: typeof common;
    };
  }
}
