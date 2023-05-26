import styled, { css } from "styled-components";

import { center, flex } from "@/styles/css.utils.styled";
import { color } from "@/styles/utils.styled";

export const InputField = ({
  id,
  lb,
  labelExtra,
  label,
  startAdornment,
  endAdornment,
  helperText,
  disabled,
  required,
  status,
  className,
  ...props
}) => {
  return (
    <>
      <InputGroup>
        {/* Input field label */}
        {label && (
          <LabelContainer $lb={lb}>
            <label htmlFor={id}>{label}</label> {required && <span>*</span>}{" "}
            {labelExtra && <small>{labelExtra}</small>}
          </LabelContainer>
        )}

        {/*  */}
        <InputFieldWrapper
          $status={status}
          $disabled={disabled}
          className={className}
        >
          {/* startAdornment - Let's you add icons and any valid html/jsx to the start of the input field  */}
          {startAdornment && (
            <div className="startAdornment">{startAdornment}</div>
          )}
          <input id={id} readOnly={disabled} {...props} />
          {/* endAdornment - Let's you add icons and any valid html/jsx to the end of the input field  */}
          {endAdornment && <div className="endAdornment">{endAdornment}</div>}
        </InputFieldWrapper>
        {/* Helper text - span tag */}
        {helperText && <HelperText $status={status}>{helperText}</HelperText>}
      </InputGroup>
    </>
  );
};

const InputGroup = styled.div`
  width: 100%;
  ${() => flex({ fd: "column", gap: "8px" })};

  > label {
    font-size: 14px;
    ${() => flex({ ai: "center", gap: "8px" })};
  }
`;

const LabelContainer = styled.div`
  ${() => flex({ gap: "8px", ai: "center" })}
  ${({ $lb }) =>
    $lb &&
    css`
      > label {
        font-weight: 500;
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

const InputFieldWrapper = styled.div`
  width: 100%;
  height: 44px;
  padding: 10px 12px;
  border-radius: 4px;
  ${() => flex({ gap: "8px" })};

  > div {
    height: 100%;
    ${() => center()};
  }

  > input {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background: transparent;
    padding: 0;
    font-size: 16px;
    outline-color: transparent;
    color: ${() => color("secondary", 90)};

    ::placeholder {
      font-size: 16px;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: inset 0 0 0px 9999px
        ${({ $status }) =>
          $status === "error"
            ? color("error", "main")
            : $status === "success"
            ? color("success", "main")
            : color("secondary", "main")};
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px black inset !important;
  }

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
`;

const HelperText = styled.div`
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
  }};
`;
