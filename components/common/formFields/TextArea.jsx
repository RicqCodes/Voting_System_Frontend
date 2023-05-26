import styled, { css } from "styled-components";

import { flex } from "@/styles/css.utils.styled";
import { color } from "@/styles/utils.styled";

export const TextArea = ({
  id,
  label,
  helperText,
  disabled,
  status,
  required,
  lb,
  className,
  ...props
}) => {
  return (
    <>
      <TextAreaGroup>
        {/* TextArea field label */}
        {label && (
          <LabelContainer $lb={lb}>
            <label htmlFor={id}>{label}</label> {required && <span>*</span>}
          </LabelContainer>
        )}

        {/*  */}
        <TextAreaWrapper
          id={id}
          readOnly={disabled}
          className={className}
          $status={status}
          $disabled={disabled}
          {...props}
        ></TextAreaWrapper>

        {/* Helper text - span tag */}
        {helperText && <HelperText $status={status}>{helperText}</HelperText>}
      </TextAreaGroup>
    </>
  );
};

const TextAreaGroup = styled.div`
  width: 100%;
  ${() => flex({ fd: "column", gap: "8px" })};

  > label {
    font-size: 14px;
    ${() => flex({ ai: "center", gap: "8px" })};
  }
`;

const LabelContainer = styled.div`
  ${() => flex({ gap: "8px", ai: "center" })};

  ${({ $lb }) =>
    $lb &&
    css`
      > label {
        font-weight: 700;
        font-size: 16px;
      }
    `}

  > span {
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    color: ${() => color("error", 40)};
  }
`;

const TextAreaWrapper = styled.textarea`
  width: 100%;
  padding: 12px 12px;
  border-radius: 4px;
  outline: none;
  border: none;
  font-size: 18px;
  background: transparent;
  color: ${() => color("secondary", 90)};
  ${() => flex({ gap: "8px" })};

  ${({ $status }) => {
    switch ($status) {
      case "error":
        return css`
          border: 1px solid ${() => color("error", 50)};
        `;
      case "success":
        return css`
          border: 1px solid ${() => color("success", 50)};
        `;
      default:
        return css`
          border: ${({ $disabled }) =>
            $disabled
              ? `1px solid ${color("secondary", 20)}`
              : `1px solid #fff`};
          color: ${({ $disabled }) =>
            $disabled ? color("secondary", 50) : color("secondary", 90)};
        `;
    }
  }}

  ::placeholder {
    font-size: 14px;
  }
`;

const HelperText = styled.span`
  font-size: 14px;
  ${({ $status }) => {
    switch ($status) {
      case "error":
        return css`
          color: red;
        `;
      case "success":
        return css`
          color: ${() => color("success", 50)};
        `;
      default:
        return css`
          color: color("secondary", 90);
        `;
    }
  }}
`;
