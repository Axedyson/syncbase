import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import type { GetStaticProps, NextPage } from "next";

const Custom404NotFoundPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>404 | Syncbase</title>
      </Head>
      <h1 className="m-auto">{t("404NotFound")}</h1>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale!, ["common"]),
});

export default Custom404NotFoundPage;
