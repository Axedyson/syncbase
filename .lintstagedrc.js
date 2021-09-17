const tsGlob = "*.ts?(x)";

module.exports = {
  "*.css": "stylelint --fix",
  "*.{json,md,yml}": "prettier --write",
  "*.{js,ts,tsx}": "eslint --fix",
  [`packages/server/src/**/${tsGlob}`]: () => "yarn check-types:server",
  [`packages/web/src/**/${tsGlob}`]: () => "yarn check-types:web",
};
