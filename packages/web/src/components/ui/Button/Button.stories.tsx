import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { Button } from "./Button";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Button",
  component: Button,
  argTypes: { onClick: { action: true } },
  args: {
    label: "Button",
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
export const Clicked = Template.bind({});
export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

Clicked.decorators = [(Story) => <div className="p-2">{Story()}</div>];
Clicked.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button"));
  await expect(args.onClick).toHaveBeenCalled();
};
