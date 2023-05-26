import styled from "styled-components";

import { flex } from "@/styles/css.utils.styled";

const Nodata = () => {
  return (
    <NoDataWrapper>
      <p>No Data to show here right now :(</p>
    </NoDataWrapper>
  );
};

export default Nodata;

const NoDataWrapper = styled.div`
  width: 100%;
  display: ${() => flex({ ai: "center", jc: "center" })};
  text-align: center;

  p {
    font-size: 18px;
    color: #aaa;
  }
`;
