import { zodResolver } from "@hookform/resolvers/zod/dist/zod"; // https://github.com/react-hook-form/resolvers/issues/271
import { useForm } from "react-hook-form";
import * as z from "zod";
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
    formState: { errors },
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
      className="flex flex-col w-3/12 m-auto p-2 gap-y-2"
    >
      <input
        {...register("name")}
        placeholder="Name"
        className="p-2 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
      />
      {errors.name?.message && <p>{errors.name?.message}</p>}

      <input
        {...register("email")}
        placeholder="Email"
        className="p-2 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
      />
      {errors.name?.message && <p>{errors.name?.message}</p>}

      <input
        {...register("password")}
        placeholder="Password"
        type="password"
        className="p-2 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
      />
      {errors.name?.message && <p>{errors.name?.message}</p>}

      <input
        {...register("image")}
        placeholder="Image"
        className="p-2 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
      />
      {errors.name?.message && <p>{errors.name?.message}</p>}

      <button
        type="submit"
        className="p-2 mt-1 text-white rounded-md bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50"
      >
        Submit
      </button>
    </form>
  );
};

export default urqlClientWrapper(RegisterPage, true);
