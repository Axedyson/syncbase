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
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["unused-imports"],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  ignorePatterns: ["!.*"],
  rules: {
    // yeah this sucks, vscode users just have to reload their window whenever they get the rule error:
    // https://github.com/microsoft/vscode-eslint/issues/717
    "import/no-unused-modules": ["error", { unusedExports: true }],
    "import/first": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "unknown",
          "object",
          "type",
        ],
        "newlines-between": "never",
        alphabetize: {
          order: "asc",
        },
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreDeclarationSort: true,
      },
    ],
    "import/newline-after-import": [
      "error",
      {
        count: 1,
      },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "all",
        argsIgnorePattern: "^_",
      },
    ],
    "react/prop-types": "off",
    "prefer-template": "error",
    "@next/next/no-html-link-for-pages": [
      2,
      path.join(__dirname, "packages/web/src/pages"),
    ],
    "prettier/prettier": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

module.exports = eslintrcConfig;
