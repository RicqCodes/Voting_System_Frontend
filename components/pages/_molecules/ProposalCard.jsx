import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

import { flex } from "@/styles/css.utils.styled";
import { Button } from "@/styles/elements.styled";
import { device } from "@/styles/utils.styled";
import Countdown from "./Countdown";
import Status from "./Status";
import { useLazyGetVoteEventsForProposalQuery } from "@/setup/redux/api/api";
import { useEffect } from "react";
import { findArrayWithHighestLength } from "@/utils/helpers";

const ProposalCard = ({ proposal, id }) => {
  const router = useRouter();
  const { pathname } = router;

  const [
    getVoteEventsForProposal,
    { data: allVotes, isLoading: isWinnerLoading },
  ] = useLazyGetVoteEventsForProposalQuery();
  useEffect(() => {
    id && getVoteEventsForProposal(id);
  }, [id && id]);
  const winner =
    allVotes && findArrayWithHighestLength(allVotes).key === "yesVotes"
      ? "Passed"
      : allVotes && findArrayWithHighestLength(allVotes).key === "noVotes"
      ? "Rejected"
      : allVotes && findArrayWithHighestLength(allVotes).key === "abstainVotes"
      ? "Undecided"
      : "";

  return (
    <CardContainer>
      <div>
        {proposal && !proposal?.isOpened ? (
          <Status winner={winner.toLowerCase()} withoutText />
        ) : (
          ""
        )}
      </div>
      <Image src={proposal?.imgUrl} alt="" width="280" height="280" />
      <Text>
        <h4>{proposal?.title}</h4>
        <p>
          {proposal?.description.length > 120
            ? `${proposal?.description.slice(0, 130)} ...`
            : proposal?.description}
        </p>
      </Text>
      <>{<Countdown timestamp={proposal?.startingTimestamp} />}</>
      <Link href={`${pathname}/${proposal?.proposalId}`}>
        <Vote>View Details</Vote>
      </Link>
    </CardContainer>
  );
};

export default ProposalCard;

const CardContainer = styled.div`
  max-width: 320px;
  width: 100%;
  padding: 24px;
  border: 2px solid rgba(var(--card-border-rgb), 0.15);
  border-radius: var(--border-radius);
  ${() => flex({ fd: "column", ai: "center", jc: "center", gap: "18px" })};
  transition: all 0.3s ease-in-out;
  position: relative;

  :hover {
    transition: all 0.3 ease-in;

    /* scale: 1.03; */
  }

  a {
    width: 100%;
  }

  img {
    border-radius: var(--border-radius);
  }

  /* ${() => device.down("md")} {
    max-width: 480px;
    width: 100%;
  } */

  > div:first-child {
    position: absolute;
    top: 34px;
    right: 34px;
    z-index: 999;
  }
`;

const Text = styled.div`
  width: 100%;
  ${() => flex({ fd: "column", gap: "14px" })};

  h4 {
    font-size: 18px;
  }

  p {
    font-size: 12px;
  }
`;

const Vote = styled(Button)`
  width: 100%;
`;
