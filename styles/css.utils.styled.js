import { css } from "styled-components";

// Function to flex elements

export const flex = ({ fd, ai, jc, fw, gap } = {}) => css`
  display: flex;
  flex-direction: ${fd || "row"};
  align-items: ${ai || "flex-start"};
  justify-content: ${jc || "initial"};
  flex-wrap: ${fw || "initial"};
  gap: ${gap || "0px"};
`;

// Function to centralize element

export const center = () => css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
