const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const { i18n } = require("./next-i18next.config");

/**
 * @type {import('next').NextConfig & {i18n: import('next-i18next').InternalConfig}}
 */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  i18n,
};

module.exports = (phase) => {
  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    nextConfig.i18n.reloadOnPrerender = false;
  }

  return nextConfig;
};
