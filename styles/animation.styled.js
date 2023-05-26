import { keyframes } from "styled-components";

export const popup = keyframes`
    from {
      transform: scale(80%);
    }

    to {
      transform: scale(110%);
    }
`;

export const fadein = keyframes`
    from {
      opacity: 3;
    }

    to {
      opacity: 8;
    }
`;
