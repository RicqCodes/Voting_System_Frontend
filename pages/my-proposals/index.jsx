import Head from "next/head";
import { getAppLayout } from "@/components/common/layouts/site";
import MyProposalsPage from "@/components/pages/my-proposals";

const MyProposals = () => {
  return (
    <>
      <Head>
        <title>Vote Dapp - My Proposals</title>
      </Head>
      <MyProposalsPage />
    </>
  );
};

export default MyProposals;

MyProposals.getLayout = (page) => getAppLayout(page);
