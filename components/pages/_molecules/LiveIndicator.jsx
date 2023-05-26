import styled from "styled-components";

const LiveIndicator = ({ className }) => {
  return <Indicator className={className}></Indicator>;
};

export default LiveIndicator;

const Indicator = styled.div`
  width: 20px;
  height: 20px;
  background-color: green;
  border-radius: 50%;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #00ff00;
    animation: blink 2s infinite;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
