import styled from "styled-components";
import { HiOutlineArrowRight } from "react-icons/hi";

import ProposalStats from "../_molecules/ProposalStats";
import { useGetUsersProposalQuery } from "@/setup/redux/api/api";
import { useSelector } from "react-redux";
import { flex } from "@/styles/css.utils.styled";
import LiveIndicator from "../_molecules/LiveIndicator";

const MyProposalPage = () => {
  const { EOA } = useSelector((state) => state.app);
  const { data: proposals, isLoading } = useGetUsersProposalQuery(EOA);

  console.log(proposals);

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

export default MyProposalPage;

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
