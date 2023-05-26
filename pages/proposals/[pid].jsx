import Head from "next/head";

import { getAppLayout } from "@/components/common/layouts/site";
import ProposalPage from "@/components/pages/ProposalPage";

const Proposal = () => {
  return (
    <>
      <Head>
        <title>Vote Dapp - proposalId</title>
      </Head>
      <ProposalPage />
    </>
  );
};

export default Proposal;

Proposal.getLayout = (page) => getAppLayout(page);
