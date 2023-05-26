import { Button } from "@/styles/elements.styled";
import styled, { keyframes } from "styled-components";

import { flex } from "@/styles/css.utils.styled";
import Link from "next/link";

const VoteSelectCard = ({ title, description, buttonText, icon, link }) => {
  return (
    <CardContainer>
      <h3>{title}</h3>
      <Description>
        <div>{icon}</div>
        <p>{description}</p>
      </Description>
      <Button>
        <Link href={link}>{buttonText}</Link>
      </Button>
    </CardContainer>
  );
};

export default VoteSelectCard;

const BorderRotate = keyframes`
	100% {
		--angle: 420deg;
	}
`;

const CardContainer = styled.div`
  max-width: 420px;
  width: 100%;
  border: 1px solid red;
  ${() => flex({ fd: "column", gap: "48px", ai: "center" })};
  padding: 48px 24px;
  border-radius: var(--border-radius);
  border: 2px solid transparent;
  border-color: rgba(255, 255, 255, 0.1);
  transition: border-color 0.5s;
  cursor: pointer;

  &:hover {
    border-image: conic-gradient(
        from var(--angle),
        var(--c2),
        var(--c1) 0.1turn,
        var(--c1) 0.15turn,
        var(--c2) 0.25turn
      )
      30;
    animation: ${BorderRotate} var(--d) linear infinite forwards;
  }

  button {
    a {
      color: #fff;
    }
  }

  h3 {
    text-align: center;
  }
`;

const Description = styled.div`
  ${() => flex({ ai: "center", fd: "column", gap: "24px" })};

  div {
    height: 64px;
    width: 64px;

    svg {
      height: 100%;
      width: 100%;
    }
  }

  p {
    text-align: center;
    /* font-size: ; */
  }
`;
