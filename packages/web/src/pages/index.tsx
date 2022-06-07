// import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { initUrqlClient } from "next-urql";
import Link from "next/link";
import { ssrExchange, useMutation, useQuery } from "urql";
import { LoginDialog } from "../components/login/LoginDialog";
import { Button } from "../components/ui/Button";
import { exchanges, urqlClientWrapper } from "../graphql/client";
import {
  LogoutUserDocument,
  MeDocument,
  UsersDocument,
} from "../graphql/hooks";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useLoginDialog } from "../hooks/useLoginDialog";
import type { GetStaticProps, NextPage } from "next";
import type { SSRConfig } from "next-i18next";

// TODO: Clean/refactor this garbage code up!
const IndexPage: NextPage = () => {
  const [{ data }] = useQuery({ query: UsersDocument });
  const [{ data: data1 }] = useQuery({ query: MeDocument });
  const dialog = useLoginDialog();
  const [, logoutUser] = useMutation(LogoutUserDocument);
  const [, user] = useCurrentUser();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-y-2 p-2 m-auto rounded-md border-2 border-slate-400">
      <LoginDialog />
      <p>{data1?.me?.name}</p>
      {data?.users?.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
      {!user ? (
        <>
          <p>{t("notLoggedIn")}</p>
          <Button onClick={dialog.open} label="Log In" />
          <Button onClick={dialog.open} label="Create Account" />
        </>
      ) : (
        <>
          <Link href="/account">
            <a className="text-blue-600 underline">Account page</a>
          </Link>
          <h2>This is the index page and you`re logged in </h2>
          <Button
            onClick={async () => {
              await logoutUser();
            }}
            label="Logout"
          />
        </>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps<SSRConfig> = async (ctx) => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: `http://localhost:${
        process.env.NEXT_PUBLIC_SERVER_PORT || 8080
      }/graphql`,
      fetchOptions: {
        credentials: "include",
      },
      exchanges: exchanges(ssrCache),
    },
    true
  );

  await client!.query(UsersDocument).toPromise();

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ["common", "error"])),
      urqlState: ssrCache.extractData(),
    },
  };
};

export default urqlClientWrapper(IndexPage);
