const path = require("path");

/**
 * @type {{i18n: import('next-i18next').InternalConfig}}
 */
module.exports = {
  i18n: {
    reloadOnPrerender: true,
    defaultLocale: "en",
    locales: ["en", "de"],
    localePath: path.resolve("./locales"),
    fallbackLng: false,
  },
};
