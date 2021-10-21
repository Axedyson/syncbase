const path = require("path");

// Don't use eslint v8.0.0, @typescript-eslint/eslint-plugin v5.0.0 and @typescript-eslint/parser v5.0.0
// since other packages don't support that version yet. Look here for more info:
// https://github.com/airbnb/javascript/issues/2478
// https://github.com/sweepline/eslint-plugin-unused-imports/issues/38

// Is eslint-config-next still needed as a dependency to make this work?
// look here for more info: https://github.com/vercel/next.js/issues/27981

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
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
  ignorePatterns: [
    "!.*",
    "**/node_modules/.*",
    "packages/web/src/graphql/hooks.ts",
  ],
  rules: {
    "spaced-comment": ["error", "always", { markers: ["/"] }],
    "multiline-comment-style": ["error", "separate-lines"],
    // Whenever vscode users get the "import/no-unused-modules" rule error and they solve
    // the error immediately, they have to reload their entire window/eslint server
    // to make VS Code ESLint extension happy.
    // Because the user dev experience would be quite bad, the rule is disabled in the workspace settings
    // For reference: https://github.com/microsoft/vscode-eslint/issues/717
    "import/no-unused-modules": [
      "error",
      {
        unusedExports: true,
        ignoreExports: [
          path.join(__dirname, "packages/web/src/pages/*"),
          path.join(__dirname, "packages/server/src/config/orm.ts"),
        ],
      },
    ],
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
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-var-requires": "off",
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
      "error",
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
