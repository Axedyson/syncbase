import { cacheExchange } from "@urql/exchange-graphcache";
import { withUrqlClient } from "next-urql";
import { dedupExchange, fetchExchange } from "urql";
import { MeDocument } from "./hooks";
import type { FC } from "react";

export const urqlClientWrapper = (page: FC, ssr?: boolean) =>
  withUrqlClient(
    (ssrExchange, ctx) => ({
      url: "http://localhost:8080/graphql",
      fetchOptions: {
        credentials: "include",
        headers: { cookie: ctx?.req?.headers?.cookie ?? "" },
      },
      exchanges: [
        dedupExchange,
        cacheExchange({
          updates: {
            Mutation: {
              loginUser: (result, _args, cache) => {
                cache.updateQuery({ query: MeDocument }, () => ({
                  me: result.loginUser,
                }));
              },
              logoutUser: (_result, _args, cache) => {
                cache.updateQuery({ query: MeDocument }, () => ({ me: null }));
              },
            },
          },
        }),
        ssrExchange,
        fetchExchange,
      ],
    }),
    { ssr }
  )(page);
