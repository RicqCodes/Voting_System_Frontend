import Head from "next/head";
import { getAppLayout } from "@/components/common/layouts/site";
import ProposalsPage from "@/components/pages/proposalsPage";

const Proposals = () => {
  return (
    <>
      <Head>
        <title>Vote Dapp - proposals</title>
      </Head>
      <ProposalsPage />
    </>
  );
};

export default Proposals;

Proposals.getLayout = (page) => getAppLayout(page);
