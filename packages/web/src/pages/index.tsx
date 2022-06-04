import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useMutation } from "urql";
import { LoginDialog } from "../components/login/LoginDialog";
import { Button } from "../components/ui/Button";
import { urqlClientWrapper } from "../graphql/client";
import { LogoutUserDocument } from "../graphql/hooks";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useLoginDialog } from "../hooks/useLoginDialog";
import type { GetStaticProps, NextPage } from "next";
import type { SSRConfig } from "next-i18next";

const IndexPage: NextPage = () => {
  const dialog = useLoginDialog();
  const [, logoutUser] = useMutation(LogoutUserDocument);
  const [fetching, user] = useCurrentUser();
  const { t } = useTranslation();

  if (fetching) {
    return (
      <div className="flex gap-2 p-2 m-auto rounded-md border-2 border-slate-400">
        <p>{t("notLoggedIn")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 p-2 m-auto rounded-md border-2 border-slate-400">
      <LoginDialog />
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

export const getStaticProps: GetStaticProps<SSRConfig> = async (ctx) => ({
  props: await serverSideTranslations(ctx.locale!, ["common"]),
});

export default urqlClientWrapper(IndexPage);
