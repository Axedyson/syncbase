const path = require("path");

// Don't upgrade to eslint v8.0.0 since eslint-plugin-type-graphql doesn't support that version yet.
// Look here for more info: https://github.com/borremosch/eslint-plugin-type-graphql/issues/21

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
        "plugin:tailwindcss/recommended",
        "plugin:storybook/recommended",
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
        "prettier/prettier": "warn",
        "spaced-comment": ["warn", "always", { markers: ["/"] }],
        "multiline-comment-style": ["warn", "separate-lines"],
        "import/no-useless-path-segments": [
          "warn",
          {
            noUselessIndex: true,
            commonjs: true,
          },
        ],
        "import/extensions": "warn",
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
              path.join(__dirname, "packages/server/src/config/orm.ts"),
              path.join(__dirname, "packages/web/src/pages/*"),
              path.join(__dirname, "packages/web/.storybook/preview.js"),
              path.join(
                __dirname,
                "packages/web/src/components/ui/**/*.stories.tsx"
              ),
            ],
          },
        ],
        "import/first": "warn",
        "import/order": [
          "warn",
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
        "import/newline-after-import": [
          "warn",
          {
            count: 1,
          },
        ],
        "sort-imports": [
          "warn",
          {
            ignoreDeclarationSort: true,
          },
        ],
        "@typescript-eslint/consistent-type-imports": "warn",
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
        "prefer-template": "warn",
        "@next/next/no-html-link-for-pages": [
          "error",
          path.join(__dirname, "packages/web/src/pages"),
        ],
      },
      settings: {
        tailwindcss: {
          config: path.join(__dirname, "packages/web/tailwind.config.js"),
        },
        react: {
          version: "detect", // It will default to "detect" in the future
        },
      },
      // If in general eslint takes to long to run, then just remove the below overrides section
      // and uninstall eslint-plugin-type-graphql from root package.json
      overrides: [
        {
          files: [
            "next-env.d.ts",
            "packages/web/src/**/*.ts",
            "packages/web/src/**/*.tsx",
          ],
          parserOptions: {
            project: path.join(__dirname, "packages/web/tsconfig.json"),
          },
        },
        {
          files: ["packages/server/src/**/*.ts"],
          parserOptions: {
            project: path.join(__dirname, "packages/server/tsconfig.json"),
          },
          overrides: [
            {
              files: [
                "packages/server/src/entities/**/*.ts",
                "packages/server/src/resolvers/**/*.ts",
              ],
              extends: ["plugin:type-graphql/recommended"],
              rules: {
                "type-graphql/wrong-decorator-signature": [
                  "error",
                  {
                    customTypes: {
                      string: ["GraphQLEmailAddress", "GraphQLURL"],
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      files: ["*.graphql"],
      parserOptions: {
        operations: ["packages/web/src/graphql/**/*.graphql"],
        schema: "packages/server/schema.graphql",
      },
      plugins: ["no-autofix"],
      rules: {
        "prettier/prettier": "warn",
        "@graphql-eslint/alphabetize": [
          "warn",
          {
            selections: ["OperationDefinition", "FragmentDefinition"],
            variables: ["OperationDefinition"],
            arguments: ["Field", "Directive"],
          },
        ],
      },
      overrides: [
        {
          files: ["packages/web/src/graphql/**/*.graphql"],
          extends: "plugin:@graphql-eslint/operations-recommended",
          rules: {
            "@graphql-eslint/unique-operation-name": "warn",
            "@graphql-eslint/unique-fragment-name": "warn",
          },
        },
        {
          files: ["packages/server/schema.graphql"],
          extends: "plugin:@graphql-eslint/schema-recommended",
          rules: {
            "@graphql-eslint/strict-id-in-types": "off",
            "@graphql-eslint/require-description": "off",
            "@graphql-eslint/input-name": [
              "warn",
              { checkInputType: true, caseSensitiveInputType: false },
            ],
            // Whenever vscode users get the "no-autofix/@graphql-eslint/no-unused-fields" rule error and they solve
            // the error immediately, they have to reload their entire window/eslint server
            // to make VS Code ESLint extension happy.
            // Because the user dev experience would be quite bad, the rule is disabled in the workspace settings
            // Probably has something to do with: https://github.com/dotansimha/graphql-eslint/issues/593#issuecomment-982066342
            // The same applies for these rules (there will probably be added more):
            // "@graphql-eslint/fields-on-correct-type", "@graphql-eslint/known-type-names", "@graphql-eslint/unique-operation-name",
            // "@graphql-eslint/unique-fragment-name", "@graphql-eslint/require-id-when-available" and "no-autofix/@graphql-eslint/no-unreachable-types".
            // We are also disabling the autofix feature on the rule as we want to fix this error manually
            // in the typegraphql typescript code!
            "no-autofix/@graphql-eslint/no-unused-fields": "error",
            // We are also disabling the autofix feature on this rule for the same reason!
            "@graphql-eslint/no-unreachable-types": "off",
            "no-autofix/@graphql-eslint/no-unreachable-types": "error",
          },
        },
      ],
    },
  ],
};
