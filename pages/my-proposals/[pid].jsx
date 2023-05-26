import Head from "next/head";
import { useRouter } from "next/router";

import ProposalPage from "@/components/pages/ProposalPage";
import { getAppLayout } from "@/components/common/layouts/site";

const Proposal = () => {
  const router = useRouter();
  const { query } = router;
  console.log(query);
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
