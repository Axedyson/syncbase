import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import { z } from "zod";
import { RegisterUserDocument } from "../../graphql/hooks";
import { useLoginDialog } from "../../hooks/useLoginDialog";
import { Button } from "../ui/Button";
import { InputField } from "../ui/InputField";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";

const schema = z.object({
  name: z.string().nonempty({ message: "Required" }),
  email: z.string().nonempty({ message: "Required" }).email(),
  password: z
    .string()
    .nonempty({ message: "Required" })
    .min(7, "Must be equal to or more than 7 characters")
    .max(30, "Must be less than or equal to 30 characters"),
});

type RegisterInput = z.infer<typeof schema>;

export const RegisterForm: FC = () => {
  const dialog = useLoginDialog();
  const [, submitInput] = useMutation(RegisterUserDocument);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    const result = await submitInput({ userInput: data });

    // TODO: Look at this for more info:
    // https://react-hook-form.com/api/useform/seterror
    result.error?.graphQLErrors.forEach((error) => {
      setError(error.extensions.field, { message: error.message });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
      <InputField
        label="Username"
        name="name"
        errorMsg={errors.name?.message}
        register={register}
      />
      <InputField
        label="Email"
        name="email"
        errorMsg={errors.email?.message}
        register={register}
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        errorMsg={errors.password?.message}
        register={register}
      />
      <Button label="Create Account" type="submit" loading={isSubmitting} />
      <Button onClick={dialog.close} label="Cancel" />
    </form>
  );
};
