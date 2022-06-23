import { appWithTranslation, useTranslation } from "next-i18next";
import Head from "next/head";
import { Layout } from "../components/ui/Layout";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "../global.css";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Syncbase</title>
        <meta name="description" content={t("metaDescription")} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff9400" />
        <meta name="msapplication-TileColor" content="#ff9400" />
        <meta name="theme-color" content="#ff9400" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default appWithTranslation(MyApp);
