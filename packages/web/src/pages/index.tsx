import { zodResolver } from "@hookform/resolvers/zod";
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
  email: z.string().nonempty({ message: "Required" }).email(),
  password: z
    .string()
    .nonempty({ message: "Required" })
    .min(7, "Must be equal to or more than 7 characters")
    .max(30, "Must be less than or equal to 30 characters"),
});

type RegisterInput = z.infer<typeof schema>;

const IndexPage: FC = () => {
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
    else console.log(result.data?.RegisterUser.email);
  };

  return (
    <div className="m-auto w-3/12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3 p-2"
      >
        <h2 className="mb-3">Welcome please Register!</h2>
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
      </form>
    </div>
  );
};

export default urqlClientWrapper(IndexPage);
