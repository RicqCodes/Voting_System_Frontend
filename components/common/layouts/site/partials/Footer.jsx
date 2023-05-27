import { flex } from "@/styles/css.utils.styled";
import { device } from "@/styles/utils.styled";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <p>
        Made with <span>❤️</span>
      </p>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  width: 100%;
  padding: 48px;

  ${() => flex({ ai: "center", jc: "center" })};

  p {
    font-size: 14px;
    position: relative;

    span {
      position: absolute;
      top: -15px;
      right: -30px;
      font-size: 36px;
      color: red;

      ${() => device.down("sm")} {
        top: -6px;
        right: -38px;
        font-size: 22px;
      }
    }
  }
`;

// -6;
