const tsGlob = "*.ts?(x)";

module.exports = {
  "*.css": "stylelint --fix",
  "*.{json,md,yml}": "prettier --write",
  "*.{js,ts,tsx,graphql}": () => "eslint . --fix",
  [`packages/server/**/${tsGlob}`]: () =>
    "yarn workspace @syncbase/server typecheck",
  [`packages/web/**/${tsGlob}`]: () => "yarn workspace @syncbase/web typecheck",
  "packages/server/**/*.ts":
    "yarn workspace @syncbase/server test:ci --b --findRelatedTests",
};
