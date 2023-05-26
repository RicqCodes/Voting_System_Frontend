import Head from "next/head";

import { getAppLayout } from "@/components/common/layouts/site";
import CreateProposalPage from "@/components/pages/createProposalPage";

const CreateProposal = () => {
  return (
    <>
      <Head>
        <title>Vote Dapp - create proposal</title>
      </Head>
      {<CreateProposalPage />}
    </>
  );
};

export default CreateProposal;

CreateProposal.getLayout = (page) => getAppLayout(page);
