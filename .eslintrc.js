// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

// Is eslint-config-next still needed as a dependency to make this work?
// look here for more info: https://github.com/vercel/next.js/issues/27981

/**
 * @type {import('eslint').Linter.Config}
 */
const eslintrcConfig = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  ignorePatterns: "dist/",
  rules: {
    "react/prop-types": "off",
    "prefer-template": "error",
    "prettier/prettier": "error",
    "@next/next/no-html-link-for-pages": [
      2,
      path.join(__dirname, "packages/web/src/pages"),
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

module.exports = eslintrcConfig;
