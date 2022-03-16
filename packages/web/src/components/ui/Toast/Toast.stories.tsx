import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Toast } from "./Toast";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Toast",
  component: Toast,
  args: {
    label: "Toast",
  },
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => {
  useEffect(() => {
    toast.success("Basic test");
  }, []);

  return <Toast {...args} />;
};

export const Basic = Template.bind({});

// Primary.play = async ({ args, canvasElement }) => {
//  const canvas = within(canvasElement);
//  await userEvent.click(canvas.getByRole("button"));
//  await expect(args.onClick).toHaveBeenCalled();
// };
