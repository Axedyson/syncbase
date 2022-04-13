import type { FieldValues, UseFormSetError } from "react-hook-form";
import type { OperationResult } from "urql";

export const showResultErrors = <T extends FieldValues>(
  result: OperationResult,
  setError: UseFormSetError<T>
): boolean => {
  let userInputErrors = false;

  result.error?.graphQLErrors.forEach((error) => {
    if (error.extensions.field) {
      userInputErrors = true;
      setError(error.extensions.field, { message: error.message });
    }
  });

  return userInputErrors;
};
