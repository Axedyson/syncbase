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
  ignorePatterns: [
    "!.*",
    "**/node_modules/.*",
    "packages/server/dist",
    "packages/web/.next",
    "packages/web/src/graphql/hooks.ts",
  ],
  overrides: [
    {
      files: ["*.js", "*.ts", "*.tsx"],
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
      },
      settings: {
        react: {
          version: "detect", // It will default to "detect" in the future
        },
      },
    },
    {
      files: ["*.graphql"],
      extends: "plugin:@graphql-eslint/recommended",
      parserOptions: {
        operations: ["packages/web/src/graphql/**/*.graphql"],
        schema: "packages/server/schema.graphql",
      },
      plugins: ["no-autofix"],
      rules: {
        "prettier/prettier": "error",
        "@graphql-eslint/input-name": ["error", { checkInputType: true }],
        "@graphql-eslint/alphabetize": [
          "error",
          {
            selections: ["OperationDefinition", "FragmentDefinition"],
            variables: ["OperationDefinition"],
            arguments: ["Field", "Directive"],
          },
        ],
        "@graphql-eslint/avoid-duplicate-fields": "error",
        "@graphql-eslint/unique-operation-name": "error",
        "@graphql-eslint/unique-fragment-name": "error",
        // Disabling the default autofix feature for this rule. We don't want to fix it
        // automatically since we need to change that in the actual typegraphql code!
        "@graphql-eslint/no-case-insensitive-enum-values-duplicates": "off",
        "no-autofix/@graphql-eslint/no-case-insensitive-enum-values-duplicates":
          "error",
        // Whenever vscode users get the "no-autofix/@graphql-eslint/no-unused-fields" rule error and they solve
        // the error immediately, they have to reload their entire window/eslint server
        // to make VS Code ESLint extension happy.
        // Because the user dev experience would be quite bad, the rule is disabled in the workspace settings
        // Probably has something to do with: https://github.com/dotansimha/graphql-eslint/issues/593#issuecomment-956632777
        // The same applies for these rules (there will probably be added more):
        // "@graphql-eslint/fields-on-correct-type" and "@graphql-eslint/known-type-names"
        // We are also disabling the autofix feature on the rule
        "no-autofix/@graphql-eslint/no-unused-fields": "error",
      },
      overrides: [
        {
          files: ["packages/server/schema.graphql"],
          rules: {
            "@graphql-eslint/strict-id-in-types": "off",
            "@graphql-eslint/executable-definitions": "off",
          },
        },
      ],
    },
  ],
};
