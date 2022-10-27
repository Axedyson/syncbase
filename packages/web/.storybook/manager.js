import { addons } from "@storybook/addons";
import { themes } from "@storybook/theming";

addons.setConfig({
  theme: {
    brandTitle: "Syncbase storybook",
    brandUrl: "https://syncbase.tv/",
    brandImage:
      "https://raw.githubusercontent.com/Axedyson/syncbase/main/.github/logo.svg",
    ...themes.dark,
  },
});
