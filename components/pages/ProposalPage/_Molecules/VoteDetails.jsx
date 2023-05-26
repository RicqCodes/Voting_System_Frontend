import styled from "styled-components";
import { useEffect } from "react";
import { useRouter } from "next/router";

import Charts from "./chart/Charts";
import { flex } from "@/styles/css.utils.styled";
import { useLazyGetVoteEventsForProposalQuery } from "@/setup/redux/api/api";
import { calculatePercentageShare } from "@/utils/helpers";
import { device } from "@/styles/utils.styled";

const VoteDetails = () => {
  const router = useRouter();
  const { query } = router;
  const { pid } = query;
  const [getVoteEventsForProposal, { data: voteData, isLoading }] =
    useLazyGetVoteEventsForProposalQuery();

  useEffect(() => {
    pid && getVoteEventsForProposal(pid);
  }, [pid]);

  const { abstain, yes, no } = calculatePercentageShare(
    voteData?.abstainVotes.length,
    voteData?.yesVotes.length,
    voteData?.noVotes.length
  );
  return (
    <DetailsContainer>
      <h4>Vote Details</h4>
      <VoteDataContainer>
        <Charts
          abstainVotes={voteData?.abstainVotes}
          noVotes={voteData?.noVotes}
          yesVotes={voteData?.yesVotes}
        />
        <TextInformation>
          <div style={{ color: "#18A572" }}>
            Yes {yes === "NaN" ? 0.0 : yes}%
          </div>
          <div style={{ color: "#CE4256" }}>No {no === "NaN" ? 0.0 : no}%</div>
          <div style={{ color: "#546198" }}>
            Abstain {abstain === "NaN" ? 0.0 : abstain}%
          </div>
        </TextInformation>
      </VoteDataContainer>
    </DetailsContainer>
  );
};

export default VoteDetails;

const DetailsContainer = styled.div`
  width: 100%;
  ${() => flex({ fd: "column", gap: "48px" })};
`;

const TextInformation = styled.div`
  width: 100%;
  ${() => flex({ gap: "36px", fw: "wrap", ai: "center", jc: "center" })};

  > div {
    padding: 12px 24px;
    ${() => flex({ gap: "36px", ai: "center", jc: "center" })};
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: var(--border-radius);

    ${() => device.down("md")} {
      width: 100%;
    }
  }
`;

const VoteDataContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  align-items: center;

  ${() => device.down("md")} {
    ${() => flex({ fd: "column", gap: "32px", ai: "center", jc: "center" })};
  }
`;
