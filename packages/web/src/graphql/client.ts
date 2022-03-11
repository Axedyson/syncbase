import { cacheExchange } from "@urql/exchange-graphcache";
import { withUrqlClient } from "next-urql";
import { dedupExchange, errorExchange, fetchExchange } from "urql";
import { MeDocument } from "./hooks";
import type { GraphCacheConfig } from "./hooks";
import type { FC } from "react";
import type { CombinedError } from "urql";

export const urqlClientWrapper = (page: FC, ssr?: boolean) =>
  withUrqlClient(
    (ssrExchange, ctx) => ({
      url: "http://localhost:8080/graphql",
      fetchOptions: {
        credentials: "include",
        headers: { cookie: ctx?.req?.headers?.cookie ?? "" },
      },
      exchanges: [
        errorExchange({
          onError: (error: CombinedError) => {
            error.graphQLErrors.forEach((error) => {
              if (error.extensions.code !== "BAD_USER_INPUT") {
                console.log(
                  "the following error should be in a toast component: ",
                  error.message
                );
              }
            });
          },
        }),
        dedupExchange,
        cacheExchange<GraphCacheConfig>({
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
