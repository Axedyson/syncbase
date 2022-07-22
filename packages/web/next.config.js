const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const i18nConfig = require("./next-i18next.config");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  i18n: i18nConfig.i18n,
};

module.exports = (phase) => {
  if (phase !== PHASE_DEVELOPMENT_SERVER) i18nConfig.reloadOnPrerender = false;

  return nextConfig;
};
