import { i18n } from "next-i18next";
import type { FieldErrors, FieldValues } from "react-hook-form";

export const extractErrorMsg = <T extends FieldValues>(
  errors: FieldErrors<T>,
  field: string
): string | undefined => {
  const msg = errors[field]?.message;

  return msg && i18n!.t(msg);
};
