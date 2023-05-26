import { getAppLayout } from "@/components/common/layouts/site";
import MainPage from "@/components/pages/mainpage";
import Head from "next/head";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Vote Dapp - vote list</title>
      </Head>
      <MainPage />
    </>
  );
};

export default HomePage;

HomePage.getLayout = (page) => getAppLayout(page);
