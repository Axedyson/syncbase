import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { useState } from "react";
import { Button } from "../Button";
import { Dialog } from "./Dialog";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Dialog",
  component: Dialog,
  decorators: [
    (Story) => (
      <div style={{ width: "1024px", height: "576px" }}>{Story()}</div>
    ),
  ],
} as ComponentMeta<typeof Dialog>;

export const Basic: ComponentStory<typeof Dialog> = (args) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button label="Open dialog" onClick={() => setOpen(true)} />
      <Dialog {...args} isOpen={isOpen} close={() => setOpen(false)}>
        <p>Some nice dialog content here!</p>
        <Button onClick={() => setOpen(false)} label="Close" />
      </Dialog>
    </>
  );
};

Basic.play = async ({ canvasElement }) => {
  // To query the dialog we have to perform the following workaround for now:
  // https://github.com/storybookjs/storybook/issues/16971#issuecomment-1186028103
  const body = within(canvasElement.ownerDocument.body);
  await userEvent.click(body.getByRole("button"));
  await expect(
    await body.findByText("Some nice dialog content here!")
  ).toBeInTheDocument();
};
