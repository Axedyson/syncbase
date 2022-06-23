import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "urql";
import { MeDocument } from "../graphql/generated";
import type { MeQuery } from "../graphql/generated";

export const useCurrentUser = (
  redirect?: boolean
): [boolean, MeQuery["me"]] => {
  const [{ data, fetching }] = useQuery({ query: MeDocument });
  const { replace } = useRouter();

  useEffect(() => {
    if (redirect && !fetching && !data?.me) replace("/");
  }, [data?.me, redirect, replace, fetching]);

  return [fetching, data?.me];
};
