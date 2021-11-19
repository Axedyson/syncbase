module.exports = {
  stories: ["../src/components/ui/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        // We need this since we are using a postcss version that is above 8
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  reactOptions: {
    fastRefresh: true,
  },
};
