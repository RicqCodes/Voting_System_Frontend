import styled from "styled-components";
import { MdOutlineDangerous } from "react-icons/md";
import { BsPatchCheckFill, BsExclamationOctagonFill } from "react-icons/bs";

import { flex } from "@/styles/css.utils.styled";

const Status = ({ winner, withoutText }) => {
  return (
    <StatusWrapper $color={winner}>
      {winner === "passed" && <BsPatchCheckFill />}
      {winner === "rejected" && <MdOutlineDangerous />}
      {winner === "undecided" && <BsExclamationOctagonFill />}
      {!withoutText && winner}
    </StatusWrapper>
  );
};

export default Status;

const StatusWrapper = styled.div`
  font-size: 16px;
  ${() => flex({ gap: "8px", ai: "center" })}
  color: ${({ $color }) =>
    $color === "passed"
      ? "#18A572"
      : $color === "rejected"
      ? "#CE4256"
      : $color === "undecided"
      ? "#546198"
      : ""};
`;
