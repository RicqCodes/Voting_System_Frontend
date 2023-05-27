import styled from "styled-components";

import { useFormValidation } from "@/utils/hooks/useFormValidation";
import { InputField } from "@/components/common/formFields/InputField";
import { TextArea } from "@/components/common/formFields/TextArea";
import { flex } from "@/styles/css.utils.styled";
import { Button } from "@/styles/elements.styled";
import { Loader, device } from "@/styles/utils.styled";
import { useCreateProposalMutation } from "@/setup/redux/api/api";
import { toast } from "react-hot-toast";
import {
  calculateTimeStamp,
  convertCurrentTimeToTimestamp,
  extractErrorMessage,
} from "@/utils/helpers";

const Form = () => {
  const data = {
    title: "",
    description: "",
    imageUrl: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
  };
  const [createProposal, { isLoading }] = useCreateProposalMutation();

  const { formData, getFieldProps, clearForm, validateOnSubmit } =
    useFormValidation(data, (formData, key, value) => {
      if (key !== null && value.length === 0) {
        return `The ${key.split(" ")[0]} field is required!`;
      }
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      description,
      imageUrl,
      startTime,
      endTime,
      startDate,
      endDate,
    } = formData;

    const { startingTimestamp, endingTimestamp } = calculateTimeStamp(
      startDate,
      endDate,
      startTime,
      endTime
    );

    if (
      !validateOnSubmit() ||
      startingTimestamp <= convertCurrentTimeToTimestamp()
    ) {
      if (startingTimestamp <= convertCurrentTimeToTimestamp()) {
        toast.error(`Selected time can not be less than the current time!`);
      }
    }

    await toast.promise(
      createProposal({
        title,
        description,
        imageUrl,
        startingTimestamp,
        endingTimestamp,
      }).unwrap(),
      {
        loading: () => `sending tx to the blockchain, wait... `,
        success: ({ tx, receipt }) => {
          clearForm();
          return `Your transaction has been mined successfully.;
          ${(
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://sepolia.etherscan.io/tx/${receipt?.data.hash}`}
            >
              Go to etherscan to view transaction
            </a>
          )}`;
        },
        error: (err) => extractErrorMessage(err),
      },
      {
        style: {
          background: "#000",
          border: "1px solid #fff",
          color: "#fff",
        },
        position: "top-center",
      }
    );

    // isSuccesful &&
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Container>
        <InputField
          label="Proposal Title"
          id="title"
          type="text"
          placeholder="Burn 50% of the token"
          {...getFieldProps("title")}
        />
        <TextArea
          label="Proposal Description"
          id="description"
          placeholder="Give detailed description of the proposal"
          {...getFieldProps("description")}
        />
        <InputField
          type="url"
          label="Image URL"
          id="imageUrl"
          placeholder="https://imgur/example.com"
          {...getFieldProps("imageUrl")}
        />
        <TimeContainer>
          <div>
            <InputField
              label="Start Time"
              type="time"
              id="startTime"
              {...getFieldProps("startTime")}
            />
            <InputField
              label="End Time"
              type="time"
              id="endTime"
              {...getFieldProps("endTime")}
            />
          </div>
          <div>
            <InputField
              label="Start Time"
              type="date"
              id="startDate"
              {...getFieldProps("startDate")}
            />
            <InputField
              label="End Time"
              type="date"
              id="endDate"
              {...getFieldProps("endDate")}
            />
          </div>
        </TimeContainer>
      </Container>
      <ButtonContainer>
        <Button type="submit">{isLoading ? <Loader /> : "Let's Go"}</Button>
      </ButtonContainer>
    </FormContainer>
  );
};

export default Form;

const FormContainer = styled.form`
  max-width: 840px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  background: var(--secondary-glow);
  ${() => flex({ fd: "column", gap: "32px" })};
  /* border: 1px solid rgba(255, 255, 255, 0.2); */
  border: 1px solid rgb(var(--callout-border-rgb));
  border-radius: var(--border-radius);
`;

const Container = styled.div`
  width: 100%;
  ${() => flex({ fd: "column", gap: "32px" })}
`;

const TimeContainer = styled.div`
  width: 100%;
  ${() => flex({ fd: "column", gap: "32px" })};

  > div {
    width: 100%;
    ${() => flex({ gap: "32px" })};

    ${() => device.down("sm")} {
      ${() => flex({ gap: "32px", fw: "wrap" })};
    }
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  ${() => flex({ ai: "center", jc: "center" })};

  button {
    width: 50%;
  }
`;
