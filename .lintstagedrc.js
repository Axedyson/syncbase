module.exports = {
  "*.css": "stylelint --fix",
  "*.{json,md,yml,yaml}": "prettier --write",
  "./{**/*.{js,ts,tsx,graphql},package.json}": () => "eslint . --fix",
  "packages/server/{**/*.ts?(x),package.json}": () =>
    "yarn workspace @syncbase/server typecheck",
  "packages/web/{**/*.ts?(x),package.json}": () =>
    "yarn workspace @syncbase/web typecheck",
  "packages/server/**/*.ts":
    "yarn workspace @syncbase/server test:ci --b --findRelatedTests",
};
