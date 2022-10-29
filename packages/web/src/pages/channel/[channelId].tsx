import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "urql";
import { urqlSSRClient, withUrqlClient } from "../../graphql/client";
import { UserDocument } from "../../graphql/generated";
import type { GetServerSideProps, NextPage } from "next";

const ChannelPage: NextPage = () => {
  const { t } = useTranslation(["common", "user"]);
  const { query } = useRouter();

  const [{ data }] = useQuery({
    query: UserDocument,
    variables: { channelId: query.channelId as string },
  });

  return (
    <>
      {data?.user ? (
        <>
          <h2>Channel info:</h2>
          <h3>Name: {data?.user?.name}</h3>
          <h3>ID: {data?.user?.channelId}</h3>
        </>
      ) : (
        <p>Could not find the channel 🥲</p>
      )}
      <Link href="/" className="text-blue-600 underline">
        {t("common:feed")}
      </Link>
      <Link href="/account" className="text-blue-600 underline">
        {t("user:viewAccount")}
      </Link>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "user"])),
      ...(await urqlSSRClient([UserDocument], query)),
    },
  };
};

export default withUrqlClient(ChannelPage);
