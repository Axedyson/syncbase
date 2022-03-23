import { cacheExchange } from "@urql/exchange-graphcache";
import { withUrqlClient } from "next-urql";
import { toast } from "react-hot-toast";
import { dedupExchange, errorExchange, fetchExchange } from "urql";
import { MeDocument } from "./hooks";
import type { GraphCacheConfig, MeQuery } from "./hooks";
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
                  me: result.loginUser as MeQuery["me"],
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
        errorExchange({
          onError: (error) => {
            error.graphQLErrors.forEach((error) => {
              // Don't display user input errors here, do that at the location of the form
              // e.g. by displaying user input errors close to the respective input fields
              if (error.extensions.code !== "BAD_USER_INPUT") {
                toast.error(error.message);
              }
            });
          },
        }),
      ],
    }),
    { ssr }
  )(page);
