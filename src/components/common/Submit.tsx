import React, { useState } from "react";
import styled from "styled-components";
import * as theme from "../../styles/theme";
import search from "../../assets/images/pencil.png";

interface ISubmitType {
  width?: string;
  height?: string;
  placeholder?: string;
  onClick?: any;
  setData?: any;
  data?: string | undefined;
}
function Submit({
  width = "100%",
  height = "40px",
  placeholder,
  onClick,
  setData,
  data,
}: ISubmitType) {
  return (
    <Wrap width={width}>
      <Input
        type="text"
        height={height}
        placeholder={placeholder}
        value={data ? data : ""}
        onChange={(e: any) => setData(e.target.value)}
      />
      <SubmitButton
        type="submit"
        height={height}
        onClick={(e: any) => onClick(e)}
        value=""
      />
    </Wrap>
  );
}

const Wrap = styled.div<ISubmitType>`
  width: ${(props) => props.width};
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Input = styled.input<ISubmitType>`
  width: calc(100% - ${(props) => props.height});
  height: ${(props) => props.height};
  border: 2px solid ${theme.SecondaryColor};
  box-sizing: border-box;
  border-radius: 5px 0 0 5px;
  background-color: #fff;
  padding: 12px 10px;

  &::placeholder {
    color: #d0d0d0;
    font-size: 16px;
    position: relative;
    top: 2px;
  }
`;

const SubmitButton = styled.input<ISubmitType>`
  width: ${(props) => props.height};
  height: ${(props) => props.height};
  border-radius: 0 5px 5px 0;
  box-sizing: border-box;
  background: ${theme.PrimaryColor} url(${search}) no-repeat center center;
  background-size: 60%;
  text-indent: -999;
`;

export default Submit;
