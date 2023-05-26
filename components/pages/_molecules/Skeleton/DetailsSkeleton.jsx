import { flex } from "@/styles/css.utils.styled";
import styled, { keyframes } from "styled-components";

const DetailSkeleton = () => {
  return (
    <SkeletonWrapper>
      <div>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div></div>
    </SkeletonWrapper>
  );
};

export default DetailSkeleton;

const Shine = keyframes`
     to {
      background-position-x: -200%;
    }
`;

const SkeletonWrapper = styled.div`
  width: 100%;
  height: 65vh;
  ${() => flex({ gap: "64px" })};

  > div:first-child {
    ${() => flex({ gap: "48px", fd: "column" })};
    animation: 1.5s shine linear infinite;
    width: 100%;

    > div:first-child {
      ${() => flex({ gap: "28px" })};

      > div {
        height: 24px;
        width: 84px;

        background: #eee;
        background: linear-gradient(
          110deg,
          rgba(0, 0, 0, 0.1) 8%,
          rgba(255, 255, 255, 0.2) 18%,
          rgba(0, 0, 0, 0.1) 33%
        );
        background-size: 200% 100%;
        animation: 1.5s ${Shine} linear infinite;
      }
    }

    > div:nth-child(2) {
      width: 100%;
      ${() => flex({ gap: "48px", fd: "column" })};

      > div {
        height: 64px;
        width: 100%;
        background: #eee;
        background: linear-gradient(
          110deg,
          rgba(0, 0, 0, 0.1) 8%,
          rgba(255, 255, 255, 0.2) 18%,
          rgba(0, 0, 0, 0.1) 33%
        );
        background-size: 200% 100%;
        animation: 1.5s ${Shine} linear infinite;
      }
    }

    > div:nth-child(3) {
      ${() => flex({ gap: "18px" })};
      width: 100%;

      > div {
        width: 64px;
        height: 48px;
        background: #eee;
        background: linear-gradient(
          110deg,
          rgba(0, 0, 0, 0.1) 8%,
          rgba(255, 255, 255, 0.2) 18%,
          rgba(0, 0, 0, 0.1) 33%
        );
        background-size: 200% 100%;
        animation: 1.5s ${Shine} linear infinite;
      }
    }
  }

  > div:last-child {
    width: 75%;
    height: 480px;
    background: #eee;
    background: linear-gradient(
      110deg,
      rgba(0, 0, 0, 0.1) 8%,
      rgba(255, 255, 255, 0.2) 18%,
      rgba(0, 0, 0, 0.1) 33%
    );
    background-size: 200% 100%;
    animation: 1.5s ${Shine} linear infinite;
  }
`;
