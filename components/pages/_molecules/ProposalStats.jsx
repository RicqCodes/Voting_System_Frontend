import styled from "styled-components";

import { flex } from "@/styles/css.utils.styled";
import ProposalCard from "./ProposalCard";
import Nodata from "./Nodata";
import CardSkeleton from "./Skeleton/CardSkeleton";
import { useLazyGetVoteEventsForProposalQuery } from "@/setup/redux/api/api";
import { useEffect } from "react";

const ProposalStats = ({ className, heading, proposals }) => {
  return (
    <LiveContainer className={className}>
      <Heading>{heading}</Heading>
      <Container>
        {proposals?.length > 0 ? (
          proposals?.map((proposal) => (
            <ProposalCard
              key={proposal.proposalId}
              proposal={proposal}
              id={proposal.proposalId}
            />
          ))
        ) : proposals?.length === 0 ? (
          <Nodata />
        ) : (
          <Container>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </Container>
        )}
      </Container>
    </LiveContainer>
  );
};

export default ProposalStats;

const LiveContainer = styled.div`
  width: 100%;
  ${() => flex({ fd: "column", gap: "24px" })};
`;

const Heading = styled.div`
  ${() => flex({ gap: "8px", ai: "center" })};
`;

const Container = styled.div`
  width: 100%;
  ${() => flex({ gap: "32px", ai: "center", fw: "wrap" })};

  p,
  svg {
    font-size: 14px;
  }
`;
