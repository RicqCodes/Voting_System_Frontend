import styled, { css } from "styled-components";

import { color, device, shadow } from "./utils.styled";

export const Container = styled.div`
  width: 100%;
  max-width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "1440px")};
  padding: 12px 24px;
  margin: auto;
`;

export const Button = styled.button`
  background: none;
  border: none;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  min-height: 30px;
  min-width: 105px;
  padding: 12px 24px 12px 24px;
  background: var(--tile-border);
  border-radius: var(--border-radius);
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  transition: ease-out 0.3s;
  width: ${({ $fullWidth }) => $fullWidth && "100%"};

  /* Elevation */
  ${({ $elevated = "xs" }) => {
    return css`
      box-shadow: ${() => shadow($elevated)};
    `;
  }}
  /* Sizes */
    ${({ $size }) => {
    switch ($size) {
      case "sm":
        return css`
          min-height: 40px;
          min-width: 109px;
        `;
      case "md":
        return css`
          min-width: 128px;
          min-height: 48px;
        `;
      default:
        break;
    }
  }}
`;

// Resizes based on device scrren size, very fluid

export const FluidTitle = styled.h1`
  color: ${() => (color ? color : color())};
  font-size: 4.8vw;
  font-weight: ${({ $weight }) => ($weight ? $weight : "700")};
  ${() => device.up("sm")} {
    font-size: ${(props) =>
      props.$size
        ? props.$size
        : props.as === "h2"
        ? "24px"
        : props.as === "h3"
        ? "20px"
        : "32px"};
  }
`;
