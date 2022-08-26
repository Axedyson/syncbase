import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useMutation } from "urql";
import { Button } from "../components/ui/Button";
import { withUrqlClient } from "../graphql/client";
import { LogoutUserDocument } from "../graphql/generated";
import { useCurrentUser } from "../hooks/useCurrentUser";
import type { GetStaticProps, NextPage } from "next";

const AccountPage: NextPage = () => {
  const [, logoutUser] = useMutation(LogoutUserDocument);
  const [, user] = useCurrentUser(true);

  const { t } = useTranslation(["common", "auth"]);

  return (
    <div className="m-auto flex flex-col gap-y-2 rounded-md border-2 border-slate-400 p-2">
      <Link href="/">
        <a className="text-blue-600 underline">{t("common:feed")}</a>
      </Link>
      {user && (
        <>
          <h2>{t("auth:loggedIn")}</h2>
          <p>{`id: ${user.id}`}</p>
          <p>{`${t("auth:username")}: ${user.name}`}</p>
          <p>{`${t("auth:email")}: ${user.email}`}</p>
          <Button
            onClick={async () => {
              await logoutUser({});
            }}
            label={t("auth:logOut")}
          />
        </>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale!, ["common", "auth"]),
});

export default withUrqlClient(AccountPage);
