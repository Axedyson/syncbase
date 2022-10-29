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

  const { t } = useTranslation(["common", "auth", "user"]);

  return (
    <>
      <Link href="/" className="text-blue-600 underline">
        {t("common:feed")}
      </Link>
      {user && (
        <>
          <h2>{t("auth:loggedIn")}</h2>
          <p>{`id: ${user.id}`}</p>
          <p>{`${t("auth:username")}: ${user.name}`}</p>
          <p>{`${t("auth:email")}: ${user.email}`}</p>
          <Link
            className="text-blue-600 underline"
            href={`/channel/${user.channelId}`}
          >
            {t("user:yourChannel")}
          </Link>
          <Button
            onClick={async () => {
              await logoutUser({});
            }}
            label={t("auth:logOut")}
          />
        </>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale!, ["common", "auth", "user"]),
});

export default withUrqlClient(AccountPage);
