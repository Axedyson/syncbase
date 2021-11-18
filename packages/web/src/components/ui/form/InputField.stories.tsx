import { useForm } from "react-hook-form";
import { InputField } from "./InputField";
import type { Meta, Story } from "@storybook/react";

// Not sure how to make the generic type props of the InputField component work with storybook.
// Because of that I'm defining a custom interface with no generics to the Story and Meta types:
interface InputFieldProps {
  label: string;
  name: string;
  errorMsg: string;
  type: string;
}

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
} as Meta<InputFieldProps>;

const Template: Story<InputFieldProps> = (args) => {
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
