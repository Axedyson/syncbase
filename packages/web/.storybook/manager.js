import { addons } from "@storybook/addons";
import { themes } from "@storybook/theming";

addons.setConfig({
  theme: {
    brandTitle: "Syncbase storybook",
    brandUrl: "http://syncbase.tv/",
    brandImage:
      "https://raw.githubusercontent.com/Axedyson/syncbase/main/logo.svg",
    ...themes.dark,
  },
});
