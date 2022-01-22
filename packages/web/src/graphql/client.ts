import { withUrqlClient } from "next-urql";
import { cacheExchange, dedupExchange, fetchExchange } from "urql";
import type { FC } from "react";

export const urqlClientWrapper = (page: FC, ssr?: boolean) =>
  withUrqlClient(
    (ssrExchange) => ({
      url: "http://localhost:8080/graphql",
      fetchOptions: { credentials: "include" },
      exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
    }),
    { ssr }
  )(page);
