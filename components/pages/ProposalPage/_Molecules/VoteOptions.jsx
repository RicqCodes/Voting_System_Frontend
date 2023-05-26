import { useRef } from "react";
import styled from "styled-components";

import { flex } from "@/styles/css.utils.styled";

const VoteOptions = ({ pid, setIsOpen, handleVote }) => {
  const yesVote = useRef(null);
  const noVote = useRef(null);
  const abstainVote = useRef(null);

  const handleVoteSelect = (vote) => {
    const value = vote.current.dataset.vote;

    handleVote(value);

    setIsOpen(false);
  };

  return (
    <OptionsWrapper
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(false);
      }}
    >
      <OptionBox>
        <Heading>
          <div>
            <h3>How would you like to vote for</h3>
            <code>{pid}</code>
          </div>
          <div></div>
        </Heading>
        <Body>
          <div
            ref={yesVote}
            data-vote={1}
            onClick={() => handleVoteSelect(yesVote)}
          >
            Yes
          </div>
          <div
            ref={noVote}
            data-vote={2}
            onClick={() => handleVoteSelect(noVote)}
          >
            No
          </div>
          <div
            ref={abstainVote}
            data-vote={0}
            onClick={() => handleVoteSelect(abstainVote)}
          >
            Abstain
          </div>
        </Body>
      </OptionBox>
    </OptionsWrapper>
  );
};

export default VoteOptions;

const OptionsWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  ${() => flex({ ai: "center", jc: "center" })};
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 999;
`;

const OptionBox = styled.div`
  max-width: 650px;
  width: 100%;
  background-color: black;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: var(--border-radius);
  padding: 24px 0;
`;

const Heading = styled.div`
  width: 100%;
  ${() => flex({ ai: "center", jc: "center", fd: "column", gap: "18px" })};

  > div:first-child {
    padding: 0 24px;
    ${() => flex({ ai: "center", jc: "center", fd: "column", gap: "12px" })};

    code {
      font-size: 14px;
      font-style: italic;
      font-weight: 100;
      color: rgba(255, 255, 255, 0.5);
    }
  }
  > div:last-child {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    height: 3px;
  }
`;

const Body = styled.div`
  width: 100%;
  padding: 24px;
  ${() => flex({ fd: "column", gap: "24px" })};

  > div {
    width: 100%;
    padding: 14px 24px;
    background: rgba(255, 255, 255, 0.07);
    cursor: pointer;
  }
`;
