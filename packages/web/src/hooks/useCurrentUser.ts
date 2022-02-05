import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../graphql/hooks";
import type { MeQuery } from "../graphql/hooks";

export const useCurrentUser = (
  redirect?: boolean
): [boolean, MeQuery["me"]] => {
  const [{ data, fetching }] = useMeQuery();
  const { replace } = useRouter();

  useEffect(() => {
    if (redirect && !data?.me) replace("/");
  }, [data?.me, redirect, replace]);

  return [fetching, data?.me];
};
