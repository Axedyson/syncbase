import { cacheExchange } from "@urql/exchange-graphcache";
import { withUrqlClient } from "next-urql";
import { toast } from "react-hot-toast";
import { dedupExchange, errorExchange, fetchExchange } from "urql";
import { MeDocument } from "./hooks";
import type { GraphCacheConfig } from "./hooks";
import type { NextPage } from "next";

export const urqlClientWrapper = (page: NextPage, ssr?: boolean) =>
  withUrqlClient(
    (ssrExchange, ctx) => ({
      url: "http://localhost:8080/graphql",
      fetchOptions: {
        credentials: "include",
        headers: { cookie: ctx?.req?.headers?.cookie ?? "" },
      },
      exchanges: [
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
        errorExchange({
          onError: (error) => {
            error.graphQLErrors.forEach((error) => {
              // Don't display errors in a toast if it's meant to be displayed at some input field
              if (!error.extensions.field) toast.error(error.message);
            });
          },
        }),
        fetchExchange,
      ],
    }),
    { ssr }
  )(page);
