import styled from "styled-components";

import Form from "./_molecules/Form";
import { flex } from "@/styles/css.utils.styled";

const CreateProposalPage = () => {
  return (
    <ProposalContainer>
      <h3>Let's create a proposal for you</h3>
      <Form />
    </ProposalContainer>
  );
};

export default CreateProposalPage;

const ProposalContainer = styled.div`
  width: 100%;
  ${() => flex({ fd: "column", ai: "center", gap: "32px" })}
`;
