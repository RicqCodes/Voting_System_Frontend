import styled from "styled-components";
import ProposalDetails from "./_Molecules/ProposalDetails";
import VoteDetails from "./_Molecules/VoteDetails";
import { flex } from "@/styles/css.utils.styled";
import { useGetProposalQuery } from "@/setup/redux/api/api";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ProposalPage = () => {
  const { query } = useRouter();
  const { pid } = query;
  const { EOA } = useSelector((state) => state.app);
  const { data: proposal, isLoading: proposalLoading } =
    useGetProposalQuery(pid);

  return (
    <ProposalContainer>
      <ProposalDetails proposal={proposal} />
      {proposal?.[1] > 0 && <VoteDetails />}
    </ProposalContainer>
  );
};

export default ProposalPage;

const ProposalContainer = styled.div`
  width: 100%;
  ${() => flex({ fd: "column", gap: "128px" })}
`;
