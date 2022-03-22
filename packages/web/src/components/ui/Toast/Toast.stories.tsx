import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Toast } from "./Toast";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Toast",
  component: Toast,
  parameters: {
    chromatic: { delay: 1000 },
  },
  args: {
    label: "Toast",
  },
} as ComponentMeta<typeof Toast>;

export const Basic: ComponentStory<typeof Toast> = (args) => {
  useEffect(() => {
    toast.remove();
    toast("Basic toast");
  }, []);

  return <Toast {...args} />;
};

export const LongText: ComponentStory<typeof Toast> = (args) => {
  useEffect(() => {
    toast.remove();
    toast("This is some very long text lorem ipsum bla bla");
  }, []);

  return <Toast {...args} />;
};

export const Success: ComponentStory<typeof Toast> = (args) => {
  useEffect(() => {
    toast.remove();
    toast.success("Success toast");
  }, []);

  return <Toast {...args} />;
};

export const Error: ComponentStory<typeof Toast> = (args) => {
  useEffect(() => {
    toast.remove();
    toast.error("Error toast");
  }, []);

  return <Toast {...args} />;
};
