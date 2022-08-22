module.exports = {
  "*.{json,md,yml,yaml}": "prettier --write --no-error-on-unmatched-pattern",
  "*.css": "stylelint --fix --allow-empty-input",
  "./{**/*.{js,ts,tsx,graphql},package.json}": () => "eslint . --fix",
  "packages/server/{**/*.ts?(x),package.json}": () =>
    "yarn workspace @syncbase/server typecheck",
  "packages/web/{**/*.ts?(x),package.json}": () => [
    "yarn workspace @syncbase/web typecheck",
    "yarn workspace @syncbase/web codegencheck",
  ],
  "packages/server/**/*.ts":
    "yarn workspace @syncbase/server test:ci --b --findRelatedTests --passWithNoTests",
};
