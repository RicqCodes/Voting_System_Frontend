import styled, { keyframes } from "styled-components";
import { FaVoteYea } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";

import { flex } from "@/styles/css.utils.styled";
import VoteSelectCard from "./_molecules/VoteSelectCard";
import { device } from "@/styles/utils.styled";

const MainPage = () => {
  return (
    <MainPageContainer>
      <Heading>
        <p>Let's help you make decisions</p>
        <p>
          <span>Created By </span>
          <code>Ricqcodes</code>
        </p>
      </Heading>
      <Container>
        <VoteSelectCard
          title="Create Proposal"
          description="Let's get you started by creating a new proposal."
          buttonText="Create Proposal"
          icon={<FaVoteYea />}
          link="/create-proposal"
        />
        <VoteSelectCard
          title="View Recent Proposals"
          description="View recent the recent proposals on the application"
          buttonText="View Proposals"
          icon={<HiViewGrid />}
          link="/proposals"
        />
      </Container>
    </MainPageContainer>
  );
};

export default MainPage;

const DropInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const MainPageContainer = styled.div`
  width: 100%;
  ${() => flex({ fd: "column", gap: "48px" })};
`;

const Heading = styled.div`
  width: 75%;
  margin: auto;
  ${() => flex({ ai: "center", jc: "space-between" })};

  ${() => device.down("sm")} {
    width: 100%;
    ${() => flex({ fd: "column-reverse", gap: "24px" })};
  }

  > p:first-child {
    padding: 10px;
    font-size: 16px;
    background-color: rgba(var(--callout-rgb), 0.5);
    border: 1px solid rgba(var(--callout-border-rgb), 0.3);
    border-radius: var(--border-radius);
  }

  > p:last-child {
    span {
      font-size: 12px;
    }
    code {
      border: 1px solid rgba(var(--callout-border-rgb), 0.3);
      font-weight: 800;
      padding: 6px;
      font-size: 18px;
      background: var(--primary-glow);
      /* border-radius: var(--border-radius); */
    }
  }
`;

const Container = styled.div`
  width: 100%;
  ${() => flex({ gap: "64px", jc: "center", fw: "wrap" })};
  animation: ${DropInAnimation} 1s ease;
`;
