import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import { z } from "zod";
import { LoginUserDocument } from "../../graphql/generated";
import { useLoginDialog } from "../../hooks/useLoginDialog";
import { Button } from "../ui/Button";
import { InputField } from "../ui/InputField";
import { extractErrorMsg } from "./utils/extractErrorMsg";
import { showResultErrors } from "./utils/showResultErrors";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";

const schema = z.object({
  email: z.string().min(1, "auth:emailRequired").email("auth:invalidEmail"),
  password: z
    .string()
    .min(1, "auth:passwordRequired")
    .min(7, "auth:passwordMinLengthError")
    .max(30, "auth:passwordMaxLengthError"),
});

type LoginInput = z.infer<typeof schema>;

export const LoginForm: FC = () => {
  const dialog = useLoginDialog();
  const [, submitInput] = useMutation(LoginUserDocument);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(schema),
  });
  const { t } = useTranslation(["auth", "common"]);

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    const result = await submitInput({ userInput: data });
    if (!showResultErrors(result, setError)) dialog.close();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
      <InputField
        label={t("auth:email")}
        name="email"
        errorMsg={extractErrorMsg(errors, "email")}
        register={register}
      />
      <InputField
        label={t("auth:password")}
        name="password"
        type="password"
        errorMsg={extractErrorMsg(errors, "password")}
        register={register}
      />
      <Button label={t("auth:logIn")} type="submit" loading={isSubmitting} />
      <Button onClick={dialog.close} label={t("common:cancel")} />
    </form>
  );
};
