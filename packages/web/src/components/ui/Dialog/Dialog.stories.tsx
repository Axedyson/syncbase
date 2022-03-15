import { useState } from "react";
import { Button } from "../Button";
import { Dialog } from "./Dialog";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Dialog",
  component: Dialog,
  parameters: {
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button label="open dialog" onClick={() => setOpen(true)} />
      <Dialog {...args} isOpen={isOpen} close={() => setOpen(false)}>
        <p>Some nice dialog content here!</p>
        <Button onClick={() => setOpen(false)} label="Close" />
      </Dialog>
    </>
  );
};

export const Basic = Template.bind({});
