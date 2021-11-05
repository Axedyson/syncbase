module.exports = {
  stories: ["../src/components/ui/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          // When using postCSS 8
          implementation: require("postcss"),
        },
      },
    },
  ],
  reactOptions: {
    fastRefresh: true,
  },
};
