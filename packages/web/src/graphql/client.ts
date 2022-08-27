import { cacheExchange } from "@urql/exchange-graphcache";
import { i18n } from "next-i18next";
import {
  /* initUrqlClient,*/
  withUrqlClient as withNextUrqlClient,
} from "next-urql";
import { toast } from "react-hot-toast";
import {
  dedupExchange,
  errorExchange,
  fetchExchange /* ssrExchange*/,
} from "urql";
import { MeDocument } from "./generated";
import type { GraphCacheConfig, User, WithTypename } from "./generated";
// import type { DocumentNode } from "graphql";
import type { NextPage } from "next";
import type { SSRExchange } from "next-urql";
import type { ClientOptions } from "urql";

const buildUrqlConfig = (ssrExchange: SSRExchange): ClientOptions => ({
  url: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080/graphql",
  fetchOptions: { credentials: "include" },
  exchanges: [
    dedupExchange,
    cacheExchange<GraphCacheConfig>({
      updates: {
        Mutation: {
          loginUser: (result, _args, cache) => {
            cache.updateQuery<{ me: WithTypename<User> }>(
              { query: MeDocument },
              () => ({
                me: result.loginUser,
              })
            );
          },
          registerUser: (result, _args, cache) => {
            cache.updateQuery<{ me: WithTypename<User> }>(
              { query: MeDocument },
              () => ({
                me: result.registerUser,
              })
            );
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
          //  Don't display errors in a toast if it's meant to be displayed at some input field
          if (!error.extensions.field && typeof window !== "undefined") {
            toast.error(i18n!.t(error.message));
          }
        });
      },
    }),
    fetchExchange,
  ],
});

// export const urqlSSRClient = async (queries: DocumentNode[]) => {
//  const ssrCache = ssrExchange({ isClient: false });
//  const urqlConfig = buildUrqlConfig(ssrCache);
//  const client = initUrqlClient(urqlConfig, false);
//
//  for (const query of queries) await client!.query(query).toPromise();
//
//  return { urqlState: ssrCache.extractData() };
// };
//
// The way urqlSSRClient should be used is as follows:
//
// export const getStaticProps: GetStaticProps = async ({ locale }) => ({
//  props: {
//    ...(await serverSideTranslations(locale!, ["common", "auth", "user"])),
//    ...(await urqlSSRClient([UsersDocument])),
//  },
// });

export const withUrqlClient = (page: NextPage) =>
  withNextUrqlClient(buildUrqlConfig)(page);
