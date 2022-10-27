import { useForm } from "react-hook-form";
import { InputField } from "./InputField";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "InputField",
  component: InputField,
  argTypes: {
    register: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    name: "some name",
  },
} as ComponentMeta<typeof InputField>;

const Template: ComponentStory<typeof InputField> = (args) => {
  const { register } = useForm();

  return <InputField {...args} register={register} />;
};

export const TextField = Template.bind({});
TextField.args = {
  label: "Name",
};

export const PasswordField = Template.bind({});
PasswordField.args = {
  type: "password",
  label: "Password",
};

export const TextFieldWithValidations = Template.bind({});
TextFieldWithValidations.args = {
  label: TextField.args.label,
  errorMsg: "Something went wrong!",
};
