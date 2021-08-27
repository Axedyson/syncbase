const tsGlob = "*.ts?(x)";

module.exports = {
  "*.css": "stylelint --fix",
  "*.{json,md,yml}": "prettier --write",
  "*.{js,ts,tsx}": "eslint --fix",
  [`packages/server/src/**/${tsGlob}`]: () =>
    "yarn workspace @syncbase/server tsc --noEmit",
  [`packages/web/src/**/${tsGlob}`]: () =>
    "yarn workspace @syncbase/web tsc --noEmit",
