import { zodResolver } from "@hookform/resolvers/zod/dist/zod"; // https://github.com/react-hook-form/resolvers/issues/271
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../components/ui/Button";
import { InputField } from "../components/ui/form/InputField";
import { urqlClientWrapper } from "../graphql/client";
import { useRegisterUserMutation } from "../graphql/hooks";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";

const schema = z.object({
  name: z.string().nonempty({ message: "Required" }),
  email: z.string().nonempty({ message: "Required" }),
  password: z.string().nonempty({ message: "Required" }),
  image: z.string().nonempty({ message: "Required" }),
});

type RegisterInput = z.infer<typeof schema>;

const RegisterPage: FC = () => {
  const [, submitInput] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    submitInput({ userInput: data }).then((result) => {
      if (result.error) console.log(result.error.message);
      else console.log(result.data?.RegisterUser.email);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-2 m-auto w-3/12"
    >
      <InputField
        register={register}
        name="name"
        label="Name"
        errorMsg={errors.name?.message}
      />
      <InputField
        register={register}
        name="email"
        label="Email"
        errorMsg={errors.email?.message}
      />
      <InputField
        register={register}
        name="password"
        label="Password"
        type="password"
        errorMsg={errors.password?.message}
      />
      <InputField
        register={register}
        name="image"
        label="Image"
        errorMsg={errors.image?.message}
      />
      <Button label="Create Account" type="submit" loading={isSubmitting} />
    </form>
  );
};

export default urqlClientWrapper(RegisterPage);
