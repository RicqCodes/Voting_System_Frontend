import styled from "styled-components";
import { HiOutlineArrowRight } from "react-icons/hi";

import { flex } from "@/styles/css.utils.styled";
import ProposalStats from "../_molecules/ProposalStats";
import LiveIndicator from "../_molecules/LiveIndicator";
import { useGetAllProposalQuery } from "@/setup/redux/api/api";

const ProposalsPage = () => {
  const { data: proposals, isLoading } = useGetAllProposalQuery();
  return (
    <ProposalContainer>
      <Container>
        <LiveProposals
          heading={
            <>
              <p>Live Proposals</p>
              <LiveIndicator />
              <HiOutlineArrowRight />
            </>
          }
          proposals={proposals?.runningProposal}
        />
        <UpcomingProposals
          heading={
            <>
              <p>Upcoming Proposals</p>
              <HiOutlineArrowRight />
            </>
          }
          proposals={proposals?.upcomingProposal}
        />

        <EndedProposals
          heading={
            <>
              <p>Ended Proposals</p>
              <HiOutlineArrowRight />
            </>
          }
          proposals={proposals?.closedProposal}
        />
      </Container>
    </ProposalContainer>
  );
};

export default ProposalsPage;

const ProposalContainer = styled.div`
  width: 100%;
  ${() => flex({ fd: "column", gap: "48px" })};
`;

const Container = styled.div`
  width: 100%;
  ${() => flex({ fd: "column", gap: "84px" })};
`;

const LiveProposals = styled(ProposalStats)``;

const UpcomingProposals = styled(ProposalStats)``;

const EndedProposals = styled(ProposalStats)``;
