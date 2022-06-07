import { cacheExchange } from "@urql/exchange-graphcache";
import { i18n } from "next-i18next";
import { withUrqlClient } from "next-urql";
import { toast } from "react-hot-toast";
import { dedupExchange, errorExchange, fetchExchange } from "urql";
import { MeDocument } from "./hooks";
import type { GraphCacheConfig } from "./hooks";
import type { NextPage } from "next";
import type { SSRExchange } from "next-urql";

// TODO: Maybe clean this code up a bit
export const urqlClientWrapper = (page: NextPage) =>
  withUrqlClient((ssrExchange, ctx) => ({
    url: `http://localhost:${
      process.env.NEXT_PUBLIC_SERVER_PORT || 8080
    }/graphql`,
    fetchOptions: {
      credentials: "include",
      headers: { cookie: ctx?.req?.headers?.cookie || "" },
    },
    exchanges: exchanges(ssrExchange),
  }))(page);

export const exchanges = (ssrExchange: SSRExchange) => [
  dedupExchange,
  cacheExchange<GraphCacheConfig>({
    updates: {
      Mutation: {
        loginUser: (result, _args, cache) => {
          cache.updateQuery({ query: MeDocument }, () => ({
            me: result.loginUser,
          }));
        },
        registerUser: (result, _args, cache) => {
          cache.updateQuery({ query: MeDocument }, () => ({
            me: result.registerUser,
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
        if (!error.extensions.field) {
          toast.error(i18n!.t(`error:${error.message}`));
        }
      });
    },
  }),
  fetchExchange,
];
