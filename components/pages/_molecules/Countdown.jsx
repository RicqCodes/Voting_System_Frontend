import { flex } from "@/styles/css.utils.styled";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Countdown = ({ timestamp, withoutPrefix }) => {
  const [countdownText, setCountdownText] = useState("");

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingTime = timestamp - currentTime;

      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        setCountdownText(0);
      } else {
        const days = Math.floor(remainingTime / (24 * 60 * 60));
        const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
        const seconds = remainingTime % 60;

        setCountdownText(
          `${days.toString().length === 1 ? "0" + days : days}:${
            hours.toString().length === 1 ? "0" + hours : hours
          }:${minutes.toString().length === 1 ? "0" + minutes : minutes}:${
            seconds.toString().length === 1 ? "0" + seconds : seconds
          }`
        );
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [timestamp]);

  return (
    <StartTime>
      {!withoutPrefix && (
        <>{countdownText === 0 ? "" : <small>starts in: </small>}</>
      )}
      {countdownText === 0 ? "" : <small>{countdownText}</small>}
    </StartTime>
  );
};

export default Countdown;

const StartTime = styled.div`
  width: 100%;
  ${() => flex({ gap: "4px", ai: "center", jc: "space-between" })};
  p {
    font-size: 14px;
    padding: 8px;
    border: 1px solid #fff;
    border-radius: var(--border-radius);
  }
  small:last-child {
    font-size: 14px;
  }
`;
