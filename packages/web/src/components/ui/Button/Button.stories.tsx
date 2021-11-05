import { Button } from "./Button";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    label: "Button",
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "LOool",
};
