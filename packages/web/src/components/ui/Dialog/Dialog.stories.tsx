import { useState } from "react";
import { Button } from "../Button";
import { Dialog } from "./Dialog";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Dialog",
  component: Dialog,
  decorators: [
    (Story) => (
      <div style={{ width: "1920px", height: "1080px" }}>{Story()}</div>
    ),
  ],
  args: {
    isOpen: true,
  },
} as ComponentMeta<typeof Dialog>;

export const Basic: ComponentStory<typeof Dialog> = (args) => {
  const [isOpen, setOpen] = useState(args.isOpen);

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
