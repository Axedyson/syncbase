import { useLoginDialog } from "../../../hooks/useLoginDialog";
import { Button } from "../Button";
import { Dialog } from "./Dialog";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Dialog",
  component: Dialog,
  args: {
    title: "Dialog title",
    description: "Dialog description",
  },
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => {
  const dialog = useLoginDialog();

  return (
    <>
      <Button label="open dialog" onClick={dialog.open} />
      <Dialog {...args} isOpen={dialog.isOpen} close={dialog.close}>
        <p>Some nice dialog content here!</p>
      </Dialog>
    </>
  );
};

export const Basic = Template.bind({});
