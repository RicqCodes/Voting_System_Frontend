import styled from "styled-components";
import ProposalDetails from "./_Molecules/ProposalDetails";
import VoteDetails from "./_Molecules/VoteDetails";
import { flex } from "@/styles/css.utils.styled";
import {
  useGetProposalQuery,
  useLazyGetProposalQuery,
} from "@/setup/redux/api/api";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProposalPage = () => {
  const { query } = useRouter();
  const { pid } = query;
  const { EOA } = useSelector((state) => state.app);
  const [getProposalQury, { data: proposal, isLoading: proposalLoading }] =
    useLazyGetProposalQuery();

  useEffect(() => {
    pid && getProposalQury(pid);
  }, [pid, EOA]);

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
