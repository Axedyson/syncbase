import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useMutation } from "urql";
import { LoginDialog } from "../components/login/LoginDialog";
import { Button } from "../components/ui/Button";
import { withUrqlClient } from "../graphql/client";
import { LogoutUserDocument } from "../graphql/generated";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useLoginDialog } from "../hooks/useLoginDialog";
import type { GetStaticProps, NextPage } from "next";

const IndexPage: NextPage = () => {
  const [, user] = useCurrentUser();
  const [, logoutUser] = useMutation(LogoutUserDocument);

  const dialog = useLoginDialog();
  const { t } = useTranslation(["auth", "user"]);

  return (
    <div className="m-auto flex flex-col gap-y-2 rounded-md border-2 border-slate-400 p-2">
      <LoginDialog />
      {user ? (
        <>
          <Link href="/account">
            <a className="text-blue-600 underline">{t("user:viewAccount")}</a>
          </Link>
          <h2>{t("auth:loggedIn")}</h2>
          <Button
            onClick={async () => {
              await logoutUser({});
            }}
            label={t("auth:logOut")}
          />
        </>
      ) : (
        <>
          <h2>{t("auth:notLoggedIn")}</h2>
          <Button onClick={dialog.open} label={t("auth:logIn")} />
          <Button onClick={dialog.open} label={t("auth:createAccount")} />
        </>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale!, ["common", "auth", "user"]),
});

export default withUrqlClient(IndexPage);
