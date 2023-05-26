import styled from "styled-components";

import { flex } from "@/styles/css.utils.styled";

const CardSkeleton = () => {
  return (
    <SkeletonWrapper>
      <ImageDiv></ImageDiv>
      <Text>
        <h4></h4>
        <p></p>
      </Text>
      <VoteButton></VoteButton>
    </SkeletonWrapper>
  );
};

export default CardSkeleton;

const ImageDiv = styled.div`
  height: 280px;
  width: 280px;
`;

const Text = styled.div`
  width: 100%;
  ${() => flex({ fd: "column", gap: "14px" })};

  h2 {
    height: 30px;
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
  }

  p {
    height: 54px;
    background: #000;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
  }
`;

const VoteButton = styled.div`
  width: 100%;
  height: 40px;
`;

const SkeletonWrapper = styled.div`
  max-width: 320px;
  width: 100%;
  padding: 24px;
  background: #000;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  ${() => flex({ fd: "column", ai: "center", jc: "center", gap: "18px" })};

  & ${ImageDiv}, ${VoteButton} {
    background: #000;
    background: linear-gradient(
      110deg,
      rgba(0, 0, 0, 0.1) 8%,
      rgba(255, 255, 255, 0.2) 18%,
      rgba(0, 0, 0, 0.1) 33%
    );
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
  }

  > div {
    p,
    h4 {
      background: #eee;
      background: linear-gradient(
        110deg,
        rgba(0, 0, 0, 0.1) 8%,
        rgba(255, 255, 255, 0.2) 18%,
        rgba(0, 0, 0, 0.1) 33%
      );
      border-radius: 5px;
      background-size: 200% 100%;
      animation: 1.5s shine linear infinite;
      width: 100%;
    }
  }

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
`;
