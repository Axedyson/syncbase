import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  image: string;
}

const schema = z.object({
  name: z.string().nonempty({ message: "Required" }),
  email: z.string().nonempty({ message: "Required" }),
  password: z.string().nonempty({ message: "Required" }),
  image: z.string().nonempty({ message: "Required" }),
});

const RegisterPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="mx-auto mt-2 w-3/12 flex flex-col rounded-md shadow focus:outline-none"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input {...register("name")} placeholder="name" />
      <p>{errors.name?.message}</p>

      <input {...register("email")} placeholder="email" />
      <p>{errors.email?.message}</p>

      <input {...register("password")} placeholder="password" />
      <p>{errors.password?.message}</p>

      <input {...register("image")} placeholder="image" />
      <p>{errors.image?.message}</p>

      <button
        className="bg-black rounded-md text-base shadow m-3 py-1 px-4 text-white"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterPage;
