import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegisterUserMutation } from "../graphql/hooks";
import { useLoginDialog } from "../hooks/useLoginDialog";
import { Button } from "./ui/Button";
import { Dialog } from "./ui/Dialog";
import { InputField } from "./ui/InputField";
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

export const LoginDialog: FC = () => {
  const dialog = useLoginDialog();
  const [, submitInput] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    const result = await submitInput({ userInput: data });
    if (result.error) console.log(result.error.message);
    else console.log(result.data?.registerUser.email);
  };

  return (
    <Dialog
      close={dialog.close}
      isOpen={dialog.isOpen}
      title="Create Account"
      description="Here you can create an account"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3 px-2"
      >
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
    </Dialog>
  );
};
