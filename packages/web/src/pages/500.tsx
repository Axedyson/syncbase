import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import type { GetStaticProps, NextPage } from "next";

const Custom500InternalServerErrorPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>500 | Syncbase</title>
      </Head>
      <h1>{t("500InternalServerError")}</h1>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale!, ["common"]),
});

export default Custom500InternalServerErrorPage;
