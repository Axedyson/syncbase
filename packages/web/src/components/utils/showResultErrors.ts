import type { FieldValues, UseFormSetError } from "react-hook-form";
import type { OperationResult } from "urql";

export const showResultErrors = <T extends FieldValues>(
  result: OperationResult,
  setError: UseFormSetError<T>
) => {
  result.error?.graphQLErrors.forEach((error) => {
    if (error.extensions.code === "BAD_USER_INPUT") {
      setError(error.extensions.field, { message: error.message });
    }
  });
};
