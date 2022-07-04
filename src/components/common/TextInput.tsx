import React, { useState } from "react";
import styled from "styled-components";
import * as theme from "../../styles/theme";

interface IInputType {
  width?: string;
  height?: string;
  placeholder?: string;
  maxLength?: number;
  marginTop?: string;
  marginBottom?: string;
  marginRight?: string;
  marginLeft?: string;
  setData?: any;
  data?: string | undefined | null;
}
function TextInput({
  width = "100%",
  placeholder,
  maxLength,
  marginTop = "8px",
  marginBottom = "8px",
  marginRight = "0",
  marginLeft = "0",
  setData,
  data,
}: IInputType) {
  return (
    <>
      <Input
        type="text"
        width={width}
        placeholder={placeholder}
        value={data ? data : ""}
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginRight={marginRight}
        marginLeft={marginLeft}
        onChange={(e: any) => setData(e.target.value)}
        maxLength={maxLength}
      />
      {maxLength && (
        <TextLength>
          <span>{data?.length}</span>/{maxLength}
        </TextLength>
      )}
    </>
  );
}

export function TextArea({
  height = "150px",
  placeholder,
  marginTop = "8px",
  marginBottom = "8px",
  marginRight = "0",
  marginLeft = "0",
  setData,
  data,
}: IInputType) {
  return (
    <InputArea
      height={height}
      placeholder={placeholder}
      onChange={(e: any) => setData(e.target.value)}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginRight={marginRight}
      marginLeft={marginLeft}
    >
      {data ? data : ""}
    </InputArea>
  );
}

const Input = styled.input<IInputType>`
  width: ${(props) => props.width};
  border: 1px solid #cfcfcf;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #fff;
  padding: 12px 10px;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};

  &::placeholder {
    color: #d0d0d0;
    font-size: 16px;
    position: relative;
    top: 2px;
  }

  @media screen and (max-width: 600px) {
    &::placeholder {
      font-size: 14px;
    }
  }
`;

const InputArea = styled.textarea<IInputType>`
  width: 100%;
  height: ${(props) => props.height};
  border: 1px solid #cfcfcf;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #fff;
  padding: 12px 10px;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};

  &::placeholder {
    color: #d0d0d0;
    font-size: 16px;
    position: relative;
    top: 2px;
  }

  @media screen and (max-width: 600px) {
    &::placeholder {
      font-size: 14px;
    }
  }
`;

const TextLength = styled.div`
  text-align: right;
  font-size: 14px;
  color: #cfcfcf;

  & span {
    color: ${theme.SecondaryColor};
  }
`;

export default TextInput;
