import styled from "styled-components";
import { IoIosCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineWarning } from "react-icons/ai";

import { flex } from "@/styles/css.utils.styled";

const CheckMark = ({ voted }) => {
  return (
    <Container $color={voted}>
      <CheckBox $color={voted}>
        <>
          {voted === "Yes" && <IoIosCheckmark />}
          {voted === "No" && <RxCross2 />}
          {voted === "Abstain" && <AiOutlineWarning />}
        </>
      </CheckBox>
      <p>{voted}</p>
    </Container>
  );
};

export default CheckMark;

const Container = styled.div`
  ${() => flex({ gap: "4px", ai: "center" })};

  p {
    color: ${({ $color }) =>
      $color === "Yes"
        ? "rgb(24, 165, 114)"
        : $color === "No"
        ? "red"
        : $color === "Abstain"
        ? "grey"
        : ""};
  }
`;

const CheckBox = styled.div`
  width: 100%;
  height: 18px;
  width: 18px;
  padding: 2px;
  border-radius: 50%;
  background-color: ${({ $color }) =>
    $color === "Yes"
      ? "rgb(24, 165, 114)"
      : $color === "No"
      ? "red"
      : $color === "Abstain"
      ? "grey"
      : ""};
  ${() => flex({ ai: "center", jc: "center" })};

  svg {
    color: "#fff";
  }
`;
