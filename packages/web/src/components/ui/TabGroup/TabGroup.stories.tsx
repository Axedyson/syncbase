import { Button } from "../Button";
import { TabGroup } from "./TabGroup";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "TabGroup",
  component: TabGroup,
} as ComponentMeta<typeof TabGroup>;

const Template: ComponentStory<typeof TabGroup> = (args) => (
  <TabGroup {...args}>
    <>
      <p>
        The FC typescript type is a bit annoying, should probably use something
        else
      </p>
      <a
        className="text-blue-500 underline"
        href="https://github.com/facebook/create-react-app/pull/8177"
        target="_blank"
        rel="noreferrer"
      >
        Look here for reference
      </a>
    </>
  </TabGroup>
);

export const Basic = Template.bind({});
Basic.args = {
  "A Button": <Button label="Here is a button" />,
};
